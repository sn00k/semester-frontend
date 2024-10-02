<script setup lang="ts">
import { useGetTeams } from '~/composables/useGetTeams';
import type { AbsenceApplication, AbsenceResponse, Team, TeamsResponse } from '@/types';
import { useQuery } from '@tanstack/vue-query';

useState('pageTitle', () => 'Ärenden');
definePageMeta({
  middleware: 'auth',
  title: 'Hantera Ärenden',
});

const selectedTeamId: Ref<string|null> = ref(null);
const API_URL = useRuntimeConfig().public.apiUrl;
const teams: Ref<Team[]> = ref([]);
const absenceApplications: Ref<AbsenceApplication[]> = ref([]);
const fetcher = async (): Promise<TeamsResponse> =>
  await fetch(`${API_URL}/teams`, {
  headers: {
    Authorization: `Bearer ${useCookie('token').value}`,
    Accept: 'application/json',
  },
}).then((response) => response.json());

const { data: teamsResponse, isFetched } = useQuery({
  queryKey: ['teams'],
  queryFn: fetcher
});

async function fetchAbsenceRequests(teamId: string) {
  const { data: absenceRequests } = await useFetch(`${API_URL}/teams/${teamId}/absences`)
  return absenceRequests;
}

function selectTeam(team: Team) {
  selectedTeamId.value = team.id
}

watchEffect(async ()=> {
  if (isFetched.value === true && teamsResponse.value?.data !== undefined) {
    teams.value = teamsResponse.value.data

  }

  if (selectedTeamId.value !== null) {
    const { data, error } = await useFetch(`${API_URL}/teams/${selectedTeamId.value}/absences`)
    const absences = data.value as AbsenceResponse
    if (!error) {
      absenceApplications.value = absences.absences
      console.log(absenceApplications.value);

    }
  }
})
</script>
<template>
  <Headline>
    <template #center>
    </template>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
    </template>
  </Headline>
  <div class="lg:hidden flex items-center justify-center bg-zinc-100 pb-24 dark:bg-[#141414] text w-full p-4">
    <div class="flex first:rounded-full last:rounded-full bg-[#202020] gap-6 py-2 px-6">
      <span
        v-for="team in teams"
        :key="team.id"
        v-text="team.name"
        @click="selectTeam(team)">
      </span>
    </div>
  </div>
  <div class="flex flex-col p-4 lg:py-0">

  </div>
</template>