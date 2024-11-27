<script lang="ts" setup>
import type {
  AbsenceResponse,
  Absence,
  Team,
  TeamsResponse,
  AbsencesByWeek,
  AbsenceGroupedByWeek,
} from '@/types';
import { useQuery } from '@tanstack/vue-query';
import TableCheckbox from '@/components/table/TableCheckbox.vue';
import { Button } from '@/components/button';

definePageMeta({
  middleware: 'auth',
  title: 'Översikt',
});

useState('pageTitle', () => 'Översikt');

const selectedTeamId: Ref<string | undefined> = ref();
const API_URL = useRuntimeConfig().public.apiUrl;
const teams: Ref<Team[]> = ref([]);
const absenceList: Ref<AbsencesByWeek | null> = ref(null);
const absenceUserAndWeek = computed(() => {
  if (absenceList.value !== null) {
    return Object.entries(absenceList.value.absences).reduce((acc, [week, absencesOnWeek]) => {
            if (!acc[week]) {
              acc[week] = {};
            }

            absencesOnWeek.forEach((absence) => {
              const { employee } = absence;

              if (acc[week] && !acc[week][employee]) {
                acc[week][employee] = [];
              }

              if (acc[week] && acc[week][employee])
                acc[week][employee].push(absence);
            });

            return acc;
    }, {} as Record<string, Record<string, Absence[]>>);
  }
  return null;
});
const fetcher = async (): Promise<TeamsResponse> =>
  await fetch(`${API_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
      Accept: 'application/json',
    },
  }).then((response) => response.json());

const { data: teamsResponse, isFetched } = useQuery({
  queryKey: ['teams'],
  queryFn: fetcher,
});

function selectTeam(team: Team) {
  selectedTeamId.value = team.id;
}

watch(
  [
    () => isFetched.value,
    () => teamsResponse.value?.data,
    () => selectedTeamId.value,
  ],
  async ([isFetchedValue, teamsResponseData, selectedTeamIdValue]) => {
    if (isFetchedValue && teamsResponseData) {
      teams.value = teamsResponseData as Team[];
      if (!selectedTeamIdValue) {
        selectedTeamId.value = teams.value[0]?.id;
      }
    }

    if (selectedTeamIdValue) {
      const data = await $fetch(
        `${API_URL}/teams/${selectedTeamIdValue}/absences?group_by=week`,
        {
          headers: {
            Authorization: `Bearer ${useCookie('token').value}`,
            Accept: 'application/json',
          },
        },
      );
      if (data) {
        const absences = data as AbsencesByWeek;
        absenceList.value = absences;
      } else {
        console.error('error: ', data);
      }
    }
  },
  { immediate: true },
);
</script>
<template>
  <div>
    <header class="dark:bg-primary-dark p-4 lg:bg-primary-light bg-white">
      <Headline>
        <template #left>
          <img
            class="inline-block size-6 rounded-full ring-2 ring-white lg:hidden"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </template>
        <template #center>
          <div class="md:flex pt-2 pl-6 gap-x-4 hidden">
            <span
              v-for="team in teams"
              :key="team.id"
              :class="{
                'font-bold border-b-4 border-b-accent-dark': team.id === selectedTeamId,
              }"
              @click="selectTeam(team)"
              class="px-2 cursor-pointer"
            >
              {{ team.name }}
            </span>
          </div>
        </template>
        <template #right>
          <NuxtLink to="/notifications">
            <span class="material-icons lg:hidden">notifications</span>
          </NuxtLink>
        </template>
      </Headline>
      <div class="flex justify-center md:hidden">
        <div
          class="flex items-center justify-between w-3/4 rounded-full bg-primary-light dark:bg-primary-dark"
        >
          <span
            v-for="team in teams"
            :key="team.id"
            :class="{
              'rounded-full bg-blue-500 text-white': team.id === selectedTeamId,
            }"
            @click="selectTeam(team)"
            class="px-4 py-2"
          >
            {{ team.name }}
          </span>
        </div>
      </div>
    </header>
    <div class="flex flex-col p-4 lg:py-0">
        <div class="flex flex-col" v-for="(absences, week) in absenceUserAndWeek">
          <div>
            <span>Vecka {{ week }} - </span>
            <span v-text="absenceList?.absences[week]?.length"></span> <span>Frånvarande</span>
          </div>
            <div v-for="(absence, employee) in absences">
              <span>{{ employee }}</span>
            </div>
        </div>
    </div>
  </div>
</template>
