<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAbsenceStore, useAuthStore } from '~/stores';
import { Avatar } from '~/components/avatars';
import type { Teams, TeamAbsence, Absence } from '~/types';
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
function exportCSV(absences: Absence[], week: number) {
  const csv = absences
    .map((absence) => {
      return `${absence.employee},${absence.absence_type},${absence.start_at},${absence.end_at}`;
    })
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `absences-week-${week}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
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
    <header class="dark:bg-primary-dark py-4 lg:bg-primary-light bg-white">
      <Headline>
        <template #left>
          <img
            class="inline-block size-6 self-start rounded-full ring-2 ring-white lg:hidden"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </template>
        <template #tabs>
          <div class="flex">
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
          </div>
        </template>
        <template #right>
          <NuxtLink to="/notifications">
            <span class="material-icons lg:hidden">notifications</span>
          </NuxtLink>
        </template>
      </Headline>
    </header>
    <section>
      <div class="flex flex-col lg:p-4">
        <Card
          class="flex flex-col p-0 mt-4"
          v-for="(absences, week) in teamAbsence?.absences"
          :key="week"
        >
          <div
            class="flex items-center w-full justify-between h-16"
            @click="expanded = expanded === week ? null : week"
          >
            <div class="flex flex-col items-start justify-start">
              <span class="font-semibold">Vecka {{ week }}</span>
              <span class="text-sm"> {{ absences.length }} Frånvarande </span>
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
              class="dark:bg-primary-dark dark:text-white rounded-md py-2 w-full"
            >
              <div
                v-for="absence in absences"
                :key="absence.id"
                class="flex gap-2 items-start justify-between w-full py-4 border-b-2 border-gray-100"
              >
                <div class="flex items-center">
                  <Avatar :fullName="absence.employee" class="mr-2" />
                  <div class="flex flex-col">
                    <span class="font-semibold text-sm">{{
                      absence.employee
                    }}</span>
                    <span class="text-xs">
                      {{ $dayjs(absence.start_at).format('MMM DD') }}
                      -
                      {{ $dayjs(absence.end_at).format('MMM DD') }}
                    </span>
                  </div>
                </div>
                <div class="justify-end text-right">
                  <span
                    class="capitalize text-sm bg-rose-200 dark:text-black rounded-md py-0.5 px-2 text-black justify-end"
                    >{{ absence.absence_type }}</span
                  >
                </div>
              </div>
              <button
                @click="exportCSV(absences, week)"
                class="flex justify-end w-full items-center pt-4 gap-x-2"
              >
                <span>Hämta lista</span>
                <span class="material-symbols-outlined">download</span>
              </button>
            </div>
          </Transition>
        </Card>
      </div>
    </section>
  </div>
</template>
