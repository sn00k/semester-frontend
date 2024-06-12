<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import Card from '~/components/Card.vue';
import type { Absences } from '~/types';

useState('pageTitle', () => 'Min Sida');
definePageMeta({
  middleware: 'auth',
  title: 'Min Sida',
});

const API_URL = useRuntimeConfig().public.apiUrl;
const fetcher = async (): Promise<Absences> =>
  await fetch(`${API_URL}/absences`, {
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
      Accept: 'application/json',
    },
  }).then((response) => response.json());
const {
  isPending,
  isError,
  isFetching,
  data: absences,
  error,
  refetch,
} = useQuery({
  queryKey: ['absences'],
  queryFn: fetcher,
});
function dateFormat(date: string) {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
</script>

<template>
  <Headline>
    <template #left>
      <img class="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
    </template>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
      <div>
        <button class="bg-blue-500 text-white py-2 px-4 rounded-lg">Ansök</button>
      </div>
    </template>
  </Headline>
  <div class="flex flex-col p-4 lg:py-0">
      <div class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] gap-x-4 mt-4 items-center w-full p-2 rounded-md" v-for="absence in absences?.data" :key="absence.id">
        <div class="inline-block bg-gray-300 size-10 rounded-full ring-2 ring-white"></div>
        <div class="flex flex-col grow">
            <div class="font-semibold">
              <span v-text="absence.absence_type"></span>
            </div>
            <div>
              <span class="text-sm">{{ dateFormat(absence.start_at) }} - {{ dateFormat(absence.end_at) }}</span>
            </div>
        </div>
        <div>
          <div class="flex items-center gap-x-2 rounded-md border border-gray-400 px-2 py-1">
            <span
              class="block size-2 rounded-full bg-green-500"
              :class="[
                {'bg-green-500': absence.approved},
                {'bg-red-500': !absence.approved},
                {'bg-orange-500': absence.approved === null},
              ]"
            ></span>
            <span v-if="absence.approved">Godkänd</span>
            <span v-else-if="absence.approved === false">Ej Godkänd</span>
            <span v-else>Ej Behandlad</span>
          </div>
        </div>
        <div>
        </div>
      </div>
  </div>
</template>
