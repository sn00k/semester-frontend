import { defineStore } from 'pinia';
import { useAuthStore } from '~/stores/authStore';
import type { AbsenceType } from '~/types';

type AbsenceDates = {
  startDate: string;
  endDate: string;
};

type AbsenceForm = {
  absenceId?: string;
  absenceDates: AbsenceDates;
  selectedTypeId: string;
  action: 'create' | 'update';
};

export const useAbsenceStore = defineStore('absenceStore', () => {
  const absences = ref<AbsenceType[] | null>(null);
  const selectedCompanyId = ref<string | null>(null);

  async function fetchAbsenceTypes(companyId: string) {
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
      fetchAbsenceTypes(companyId);
    }
  }

  const isCompanySelected = computed(() => !!selectedCompanyId.value);

  return {
    absences,
    selectedCompanyId,
    fetchAbsenceTypes,
    setSelectedCompanyId,
    isCompanySelected,
  };
});
