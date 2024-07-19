<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { type Ref, computed, ref } from 'vue';
import DatePicker from 'vue-tailwind-datepicker';
import { Card } from '~/components/card';
import { useAuthStore } from '~/stores/authStore';
import type { AbsenceType, User } from '~/types';

useState('pageTitle', () => 'Ny Frånvaro');
definePageMeta({
  middleware: 'auth',
  title: 'Frånvaro',
});

const API_URL = useRuntimeConfig().public.apiUrl;

const user: Ref<User | null> = ref(null);
const absenceTypes: Ref<AbsenceType[] | undefined> = ref();
const selectedCompanyId: Ref<string | null> = ref(null);
const showAbsenceTypes = ref(false);
const selectedAbsenceType = ref<null | string>(null);
const selectedTypeId = ref<null | string>(null);
const absenceDates = ref({
  startDate: '',
  endDate: '',
});

const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: async (): Promise<User> => {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
        Accept: 'application/json',
      },
    });
    return response.json();
  },
});

const {
  data: absenceTypesData,
  error: absenceTypesError,
  refetch: refetchAbsenceTypes,
} = useQuery({
  queryKey: ['absenceTypes'],
  queryFn: async (): Promise<AbsenceType[]> => {
    const response = await fetch(
      `${API_URL}/companies/${selectedCompanyId.value}/absence-types`,
      {
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    return json.data as AbsenceType[];
  },
  enabled: computed(() => !!selectedCompanyId.value),
});

function handleCompanyChange(companyId: string) {
  selectedCompanyId.value = companyId;
  refetchAbsenceTypes();
}

function selectAbsenceType(absenceType: AbsenceType) {
  selectedAbsenceType.value = absenceType.name;
  selectedTypeId.value = absenceType.id;
}

watchEffect(() => {
  if (error.value) {
    console.error('Error fetching user data:', error.value);
  }
  if (data.value) {
    user.value = data.value;
    absenceTypes.value = absenceTypesData.value;
  }
});

function submitAbsence() {
  useFetch(`${API_URL}/absences`, {
    method: 'POST',
    body: {
      company_id: selectedCompanyId.value,
      type_id: selectedTypeId.value,
      start_at: absenceDates.value.startDate,
      end_at: absenceDates.value.endDate,
      user_id: useAuthStore().user.id,
    },
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
    },
  });
}
</script>
<template>
  <div class="flex flex-col p-4">
    <!-- Company -->
    <Headline>
      <template #left>
        <img
          class="inline-block size-8 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </template>
      <template #right>
        <NuxtLink href="/notifications">
          <span class="material-icons lg:hidden">notifications</span>
        </NuxtLink>
      </template>
    </Headline>
    <Card class="flex flex-col p-0">
      <div
        v-for="company in user?.employments"
        :key="company.id"
        class="flex p-4 gap-x-3 w-full border-b-2 last:border-b-0"
      >
        <div class="flex justify-start items-center gap-x-4">
          <input
            :class="[
              'dark:checked:ring-accent-dark dark:focus:checked:ring-offset-accent-dark dark:focus:checked:ring-accent-dark dark:focus:ring-white dark:focus:ring-offset-white radio-button dark:focus:border-accent-dark dark:checked:ring-offset-accent-dark dark:hover:border-accent-dark ring-2 dark:border-accent-dark dark:checked:after:bg-accent-dark dark:bg-neutral-900 bg-white dark:ring-white dark:checked:bg-transparent',
              'checked:focus:ring-offset-transparent focus:ring-offset-black checked:bg-white checked:ring-offset-accent-light focus:ring-black checked:focus:ring-accent-light ring-offset-black dark:ring-offset-white text-accent-light border-0 ring-offset-2 focus:checked:bg-white focus:border-accent-light hover:border-black hover:checked:bg-white checked:ring-accent-light border-black checked:after:bg-accent-light ring-black',
            ]"
            type="radio"
            :id="company.id"
            :value="company.id"
            name="company_id"
            :checked="selectedCompanyId === company.id"
            @change="handleCompanyChange(company.id)"
          />
          <span
            class="w-10 h-10 p-2 bg-gray-300 rounded-full text-xs text-center justify-center items-center flex"
          >
            Logo
          </span>
          <label :for="company.id">{{ company.name }}</label>
        </div>
      </div>
    </Card>

    <!-- Absence type -->
    <template v-if="selectedCompanyId">
      <h2 class="pl-2 pt-4">Typ av frånvaro</h2>
      <Card class="py-0">
        <div
          class="flex py-3 px-2 justify-between cursor-pointer"
          @click="showAbsenceTypes = !showAbsenceTypes"
        >
          <h2>{{ selectedAbsenceType ?? 'Frånvarotyp' }}</h2>
          <span class="material-icons">
            {{ showAbsenceTypes ? 'expand_less' : 'expand_more' }}
          </span>
        </div>
        <div v-show="showAbsenceTypes" class="flex flex-col">
          <div
            v-for="absenceType in absenceTypes"
            :key="absenceType.id"
            class="flex p-3 gap-x-3 items-center"
          >
            <input
              :class="[
                'dark:checked:ring-accent-dark dark:focus:checked:ring-offset-accent-dark dark:focus:checked:ring-accent-dark dark:focus:ring-white dark:focus:ring-offset-white radio-button dark:focus:border-accent-dark dark:checked:ring-offset-accent-dark dark:hover:border-accent-dark ring-2 dark:border-accent-dark dark:checked:after:bg-accent-dark dark:bg-neutral-900 bg-white dark:ring-white dark:checked:bg-transparent',
                'checked:focus:ring-offset-transparent focus:ring-offset-black checked:bg-white checked:ring-offset-accent-light focus:ring-black checked:focus:ring-accent-light ring-offset-black dark:ring-offset-white text-accent-light border-0 ring-offset-2 focus:checked:bg-white focus:border-accent-light hover:border-black hover:checked:bg-white checked:ring-accent-light border-black checked:after:bg-accent-light ring-black',
              ]"
              type="radio"
              :id="absenceType.id"
              :value="absenceType.id"
              name="absenceType"
              @change="selectAbsenceType(absenceType)"
            />
            <label class="cursor-pointer" :for="absenceType.id">{{
              absenceType.name
            }}</label>
          </div>
        </div>
      </Card>
    </template>

    <template v-if="selectedAbsenceType">
      <div>
        <DatePicker
          class="py-4 px-4 border-none"
          v-model="absenceDates"
          as-single
          week-number
          use-range
          no-input
          :shortcuts="false"
        ></DatePicker>
      </div>
    </template>
    <template
      v-if="selectedAbsenceType && absenceDates.startDate && selectedCompanyId"
    >
      <div class="flex justify-center items-center py-8">
        <button
          class="dark:bg-accent-dark bg-accent-light text-white dark:text-black rounded-lg w-40 px-2 py-2"
          @click="submitAbsence"
        >
          Skicka ansökan
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* TODO: Add these to tailwindcss classes to the elements */
.radio-button {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  outline: none;
  position: relative;
}

.radio-button:checked::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
