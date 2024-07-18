<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Button } from '~/components/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';
import type { Absences } from '~/types';

useState('pageTitle', () => 'Min Sida');
definePageMeta({
  middleware: 'auth',
  title: 'Min Sida',
});

const isCollapsed = ref('');

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

watchEffect(() => {
  console.log('collapsed: ', isCollapsed.value);
});
</script>

<template>
  <Headline>
    <template #left>
      <img
        class="inline-block size-6 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </template>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
    </template>
  </Headline>
  <div class="flex flex-col p-4 lg:py-0">
    <Accordion
      type="single"
      collapsible
      class="w-full flex flex-col gap-y-4"
      v-model="isCollapsed"
    >
      <AccordionItem
        v-for="absence in absences?.data"
        :key="absence.id"
        :value="absence.id"
      >
        <div
          class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] gap-x-4 mt-4 items-center w-full p-2 rounded-md"
          :class="{ 'rounded-b-none': isCollapsed }"
        >
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
          <div class="bg-gray-100 dark:text-white dark:bg-zinc-800">
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
          <AccordionTrigger class="accordion-trigger">
            <template #icon>
              <span class="material-icons accordion-chevron">expand_more</span>
            </template>
          </AccordionTrigger>
        </div>
        <Transition
          class="transition-all duration-500 overflow-hidden"
          enter-from-class="transform scale-95 opacity-0 max-h-0"
          enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
          leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
          leave-to-class="transform scale-95 opacity-0 max-h-0"
        >
          <div
            class="flex bg-white text-black dark:text-white dark:bg-[#1F1F1F] items-center w-full p-2 rounded-md"
            :class="{ 'rounded-t-none': isCollapsed }"
            v-if="isCollapsed"
          >
            <AccordionContent class="accordion-content flex w-full">
              <Button
                class="flex-1 mx-2 bg-white ring-2 rounded-xl ring-accent-light text-accent-light"
              >
                <span class="material-icons">delete_forever</span>
                <span>Radera</span>
              </Button>
              <Button
                class="flex-1 mx-2 ring-2 rounded-xl ring-accent-light bg-accent-light text-white"
              >
                <span class="material-icons">edit</span>
                <span>Ändra</span>
              </Button>
            </AccordionContent>
          </div>
        </Transition>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style scoped>
.accordion-content[data-state='open'] {
  padding-top: 16px;
}

.accordion-chevron {
  transition: transform 300ms;
}
.accordion-trigger[data-state='open'] > .accordion-chevron {
  transform: rotate(180deg);
}
</style>
