import { defineStore } from 'pinia';
import { useAuthStore } from '~/stores/authStore';
import type { Absence, AbsenceType, TeamAbsence } from '~/types';

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
  const teamAbsences = ref<TeamAbsence[]>([]);

  async function fetchTeamAbsences(teamId: string) {
    const API_URL = useRuntimeConfig().public.apiUrl;
    if (teamAbsences.value.findIndex((ta) => ta.teamId === teamId) !== -1) {
      return;
    }
    const response = await fetch(
      `${API_URL}/teams/${teamId}/absences?group_by=week`,
      {
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();
    teamAbsences.value.push(json);
  }

  async function getTeamAbsences(teamId: string): Promise<TeamAbsence> {
    const index = teamAbsences.value.findIndex((ta) => ta.teamId === teamId);
    if (index !== -1 && teamAbsences.value[index]) {
      return teamAbsences.value[index];
    } else {
      await fetchTeamAbsences(teamId);
    }

    return await getTeamAbsences(teamId);
  }

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
    fetchTeamAbsences,
    getTeamAbsences,
    teamAbsences,
  };
});
