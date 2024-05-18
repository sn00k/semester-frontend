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
  <div class="flex flex-col p-4">
    <Card class="flex" v-for="absence in absences?.data" :key="absence.id">
      <div
        class="inline-block bg-gray-300 size-10 rounded-full ring-2 ring-white"
      ></div>
      <div class="flex flex-col grow">
        <div class="font-semibold">
          <span v-text="absence.absence_type"></span>
        </div>
        <div>
          <span class="text-sm"
            >{{ dateFormat(absence.start_at) }} -
            {{ dateFormat(absence.end_at) }}</span
          >
        </div>
      </div>
      <div>
        <div
          class="flex items-center gap-x-2 rounded-md border border-gray-400 px-2 py-1"
        >
          <span
            class="block size-2 rounded-full bg-green-500"
            :class="[
              { 'bg-green-500': absence.approved },
              { 'bg-red-500': !absence.approved },
              { 'bg-orange-500': absence.approved === null },
            ]"
          ></span>
          <span v-if="absence.approved">Godkänd</span>
          <span v-else-if="absence.approved === false">Ej Godkänd</span>
          <span v-else>Ej Behandlad</span>
        </div>
      </div>
      <div></div>
    </Card>
  </div>
</template>
