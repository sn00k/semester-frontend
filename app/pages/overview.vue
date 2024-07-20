<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAbsenceStore } from '~/stores';
import type { Teams, TeamAbsence } from '~/types';
definePageMeta({
  middleware: 'auth',
  title: 'Översikt',
});
const API_URL = useRuntimeConfig().public.apiUrl;
const selectedteamId: Ref<string | null> = ref(null);
const {
  data: teams,
  status,
  error,
  refresh,
} = await useFetch<Teams>(`${API_URL}/teams`, {
  headers: {
    Authorization: `Bearer ${useCookie('token').value}`,
    Accept: 'application/json',
  },
});
const absenceStore = useAbsenceStore();
const expanded = ref<number | null>(null);
const teamAbsence = computed(() =>
  absenceStore.teamAbsences.find(
    (absence) => absence.teamId === selectedteamId.value,
  ),
);
const { teamAbsences } = storeToRefs(absenceStore);

watch(selectedteamId, (newTeamId, oldTeamId) => {
  if (newTeamId !== oldTeamId && newTeamId) {
    absenceStore.getTeamAbsences(newTeamId);
  }
});
watchEffect(() => {
  if (status.value === 'success' && selectedteamId.value === null) {
    selectedteamId.value = teams.value?.data[0]?.id || null;
  }
});

function selectTeam(teamId: string) {
  selectedteamId.value = teamId;

  absenceStore.getTeamAbsences(teamId);
}
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
        <template #tabs>
          <span
            v-for="team in teams.data"
            :key="team.id"
            :class="{
              'border-b-blue-500 border-b-4': team.id === selectedteamId,
            }"
            @click="selectTeam(team.id)"
            class="px-4 py-2 cursor-pointer"
          >
            {{ team.name }}
          </span>
        </template>
        <template #right>
          <NuxtLink to="/notifications">
            <span class="material-icons lg:hidden">notifications</span>
          </NuxtLink>
        </template>
      </Headline>
    </header>
    <section>
      <div class="flex flex-col p-4 gap-y-2">
        <Card
          class="flex flex-col p-0 gap-y-2"
          v-for="(absences, week) in teamAbsence?.absences"
          :key="week"
        >
          <div
            class="flex items-center w-full justify-between gap-x-2 h-16"
            @click="expanded = expanded === week ? null : week"
          >
            <div class="flex gap-x-2 items-center">
              <span
                class="bg-gray-200 rounded-full p-1 text-gray-600"
                v-text="week"
              ></span>
              <span class="font-semibold">
                {{ absences.length }} Frånvarande
              </span>
            </div>
            <div>
              <span
                class="material-icons accordion-chevron cursor-pointer"
                :class="{ 'rotate-180': expanded === week }"
              >
                expand_more
              </span>
            </div>
          </div>
          <Transition
            enter-active-class="duration-100 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div
              v-if="expanded === week"
              class="bg-primary-light dark:bg-primary-dark dark:text-white rounded-md py-2 w-full px-4"
            >
              <div
                v-for="absence in absences"
                :key="absence.id"
                class="flex mt-4 items-center w-full p-2 justify-between"
              >
                <div class="flex flex-col">
                  <span class="font-semibold">{{ absence.employee }}</span>
                  <span class="text-xs pr-4 grow">
                    {{ $dayjs(absence.start_at).format('YYYY-MM-DD') }} -
                    {{ $dayjs(absence.end_at).format('YYYY-MM-DD') }}
                  </span>
                </div>
                <div class="grow w-2/5 justify-end text-right">
                  <span
                    class="capitalize text-sm bg-accent-light dark:bg-accent-dark dark:text-black rounded-full py-0.5 px-2 text-white justify-end"
                    >{{ absence.absence_type }}</span
                  >
                </div>
              </div>
            </div>
          </Transition>
        </Card>
      </div>
    </section>
  </div>
</template>
