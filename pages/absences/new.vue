<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { type Ref, type ComputedRef, computed, ref, watch, onBeforeMount } from 'vue'
import type { AbsenceTypes, User } from '~/types';

useState('pageTitle', () => 'Ny Frånvaro');
definePageMeta({
  middleware: 'auth',
  title: 'Ny Frånvaro'
});

const API_URL = useRuntimeConfig().public.apiUrl;

const user: Ref<User | null> = ref(null);
const absenceTypes: Ref<AbsenceTypes | undefined> = ref();

const selectedCompanyId: Ref<string | null> = ref(null);

const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: async (): Promise<User> => {
    const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
      Accept: 'application/json'
    }
  });
  return response.json();
}});

const { data: absenceTypesData, error: absenceTypesError, refetch: refetchAbsenceTypes } = useQuery({
  queryKey: ['absenceTypes'],
  queryFn: async (): Promise<AbsenceTypes> => {
    const response = await fetch(`${API_URL}/companies/${selectedCompanyId.value}/absence-types`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
        Accept: 'application/json'
      }
    })
    return response.json();
  },
  enabled: computed(() => !!selectedCompanyId.value)
})


watchEffect(() => {
  if (error.value) {
    console.error('Error fetchign user data:', error.value)
  }
  if (data.value) {
    user.value = data.value
    console.log(data.value);

    selectedCompanyId.value = data.value.employments[0].id;
  }
})

</script>
<template>
  <div class="flex flex-col p-4">
      <div class="flex bg-white gap-x-4 mt-4 items-center w-full p-2 rounded-md">
        <select>
          <option
            v-for="company in user?.employments"
            :key="company.id"
            :value="company.id"
            @select="selectedCompanyId = company.id"
            :selected="company.id === selectedCompanyId"
          >{{ company.name }}</option>
        </select>
      </div>
  </div>
</template>