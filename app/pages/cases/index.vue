<script setup lang="ts">
// TODO: Use these composables instead of having the queries in this file
// import { useGetTeams } from '~/composables/useGetTeams';
// import { useGetAbsenceRequests } from '~/composables/useAbsenceRequests';
import type {
  AbsenceApplication,
  AbsenceResponse,
  Team,
  TeamsResponse,
} from '@/types';
import { useQuery } from '@tanstack/vue-query';
import TableCheckbox from '@/components/table/TableCheckbox.vue';
import { Button } from '@/components/button';

useState('pageTitle', () => 'Ärenden');
definePageMeta({
  middleware: 'auth',
  title: 'Hantera Ärenden',
});

const selectedTeamId: Ref<string | undefined> = ref();
const API_URL = useRuntimeConfig().public.apiUrl;
const teams: Ref<Team[]> = ref([]);
const absenceApplications: Ref<AbsenceApplication[]> = ref([]);
const selectedAbsenceIds: Ref<string[]> = ref([]);
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

function setSelectedAbsences(absenceId: string) {
  const index = selectedAbsenceIds.value.indexOf(absenceId);

  if (index !== -1) selectedAbsenceIds.value.splice(index, 1);
  else selectedAbsenceIds.value.push(absenceId);
}

async function updateAbsenceStatus(approved: boolean) {
  if (selectedAbsenceIds.value.length === 0) {
    console.error('No absences selected');
    return;
  }

  for (const absenceId of selectedAbsenceIds.value) {
    try {
      await $fetch(`${API_URL}/absences/${absenceId}`, {
        method: 'PATCH',
        body: {
          approved,
        },
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error updating absence ${absenceId}:`, error);
    }
  }

  selectedAbsenceIds.value = [];
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
        `${API_URL}/teams/${selectedTeamIdValue}/absences`,
        {
          headers: {
            Authorization: `Bearer ${useCookie('token').value}`,
            Accept: 'application/json',
          },
        },
      );
      if (data) {
        const absences = data as AbsenceResponse;
        absenceApplications.value = absences.absences;
      } else {
        console.error('error: ', data);
      }
    }
  },
  { immediate: true },
);
</script>
<template>
  <Headline>
    <template #center> </template>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
    </template>
  </Headline>
  <div
    class="lg:hidden flex items-center justify-center bg-zinc-100 pb-24 dark:bg-[#141414] text w-full p-4"
  >
    <div
      class="flex itens.center first:rounded-full last:rounded-full bg-[#202020] gap-6"
    >
      <span
        v-for="team in teams"
        :key="team.id"
        v-text="team.name"
        @click="selectTeam(team)"
        class="px-4 py-2"
        :class="{
          'bg-accent-light dark:bg-yellow-400 dark:text-black dark:ring-0 text-white rounded-full':
            selectedTeamId === team.id,
        }"
      >
      </span>
    </div>
  </div>
  <div class="flex flex-col gap-y-6">
    <div class="flex flex-col lg:py-0">
      <div v-if="absenceApplications.length > 0">
        <div
          v-for="absence in absenceApplications"
          :key="absence.id"
          class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] gap-x-6 sm:gap-x-4 items-center w-full p-2 border-b-2 last:border-b-0 dark:border-[#292929]"
        >
          <div>
            <TableCheckbox @change="setSelectedAbsences(absence.id)" />
          </div>
          <div
            class="inline-block bg-gray-300 size-10 rounded-full ring-2 ring-white"
          ></div>
          <div class="flex flex-col grow">
            <div class="font-semibold">
              <span>{{ absence.employee }}</span>
            </div>
            <div>
              <span>{{ absence.absence_type }}</span>
            </div>
            <div class="text-xs">
              <div>
                <span>
                  {{ $dayjs(absence.start_at).format('YY/MM/DD') }} -
                  {{ $dayjs(absence.end_at).format('YY/MM/DD') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-x-4 px-4" v-if="absenceApplications.length > 0">
      <Button
        size="lg"
        class="bg-zinc-100 dark:bg-[#202020] dark:text-accent-dark text-lg rounded-lg px-5 flex w-full"
        @click="updateAbsenceStatus(false)"
      >
        Avslå
      </Button>
      <Button
        size="lg"
        class="bg-zinc-100 dark:bg-accent-dark dark:text-black text-lg rounded-lg px-5 flex w-full"
        @click="updateAbsenceStatus(true)"
      >
        Godkänn
      </Button>
    </div>
    <div v-else class="flex items-center justify-center text-2xl">
      <h2>Du har inga ärenden att hantera 🎉</h2>
    </div>
  </div>
</template>
