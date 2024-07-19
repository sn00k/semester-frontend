import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AbsenceType } from '~/types';

export const useAbsenceStore = defineStore('absenceStore', () => {
  const absences = ref<AbsenceType[] | null>(null);
  const selectedCompanyId = ref<string | null>(null);

  async function fetchAbsences(companyId: string) {
    const API_URL = useRuntimeConfig().public.apiUrl;
    const response = await fetch(
      `${API_URL}/companies/${companyId}/absence-types`,
      {
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();
    absences.value = json.data as AbsenceType[];
  }

  function setSelectedCompanyId(companyId: string) {
    selectedCompanyId.value = companyId;
    if (companyId && (!absences.value || absences.value.length === 0)) {
      fetchAbsences(companyId);
    }
  }

  const isCompanySelected = computed(() => !!selectedCompanyId.value);

  return {
    absences,
    selectedCompanyId,
    fetchAbsences,
    setSelectedCompanyId,
    isCompanySelected,
  };
});
