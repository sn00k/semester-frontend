<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import {
  type Ref,
  type ComputedRef,
  computed,
  ref,
  watch,
  onBeforeMount,
} from 'vue';
import Card from '~/components/Card.vue';
import type { AbsenceTypes, AbsenceType, User } from '~/types';

useState('pageTitle', () => 'Ny Frånvaro');
definePageMeta({
  middleware: 'auth',
  title: 'Ny Frånvaro',
});

const API_URL = useRuntimeConfig().public.apiUrl;

const user: Ref<User | null> = ref(null);
const absenceTypes: Ref<AbsenceType[] | undefined> = ref();
const selectedCompanyId: Ref<string | null> = ref(null);
const showAbsenceTypes = ref(false);

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

watchEffect(() => {
  if (error.value) {
    console.error('Error fetching user data:', error.value);
  }
  if (data.value) {
    user.value = data.value;
    console.log(data.value);

    selectedCompanyId.value = data.value.employments[0].id;
    absenceTypes.value = absenceTypesData.value;
  }
});
</script>
<template>
  <div class="flex flex-col p-4">
    <!-- Company -->
    <Card class="flex">
      <select class="dark:text-black w-full p-2 rounded-md">
        <option
          v-for="company in user?.employments"
          :key="company.id"
          :value="company.id"
          @select="selectedCompanyId = company.id"
          :selected="company.id === selectedCompanyId"
        >
          {{ company.name }}
        </option>
      </select>
    </Card>

    <!-- Absence type -->
    <h2>Registrera ny frånvaro</h2>
    <Card>
      <div class="flex py-4 px-3 justify-between">
        <h2>Semester</h2>
        <span
          @click="showAbsenceTypes = !showAbsenceTypes"
          class="material-icons"
        >
          expand_more
        </span>
      </div>
      <div v-if="showAbsenceTypes" class="flex flex-col">
        <div
          v-for="absenceType in absenceTypes"
          :key="absenceType.id"
          class="flex p-3 gap-x-3 items-center"
        >
          <input
            class="radio-button dark:focus:bg-none ring-2 dark:bg-neutral-900 dark:ring-accent-dark dark:text-accent-dark text-accent-light dark:checked:bg-transparent checked:bg-accent-light"
            type="radio"
            :id="absenceType.id"
            :value="absenceType.id"
            name="absenceType"
          />
          <label :for="absenceType.id">{{ absenceType.name }}</label>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.radio-button {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid yellow;
  border-radius: 50%;
  outline: none;
  position: relative;
}

/* .radio-button:checked {
  background-color: yellow;
} */

.radio-button:checked::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background: yellow;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
