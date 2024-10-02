import { useAuthStore, useAbsenceStore } from '~/stores';
import { useQueryClient, useMutation } from '@tanstack/vue-query';

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

export function useSubmitAbsence() {
  const queryClient = useQueryClient();
  const isSubmitting = ref(false);
  const submitSuccess = ref(false);
  const submitError = ref<Error | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      absenceId,
      absenceDates,
      selectedTypeId,
      action,
    }: AbsenceForm) => {
      const API_URL = useRuntimeConfig().public.apiUrl;
      const uri = absenceId
        ? `${API_URL}/absences/${absenceId}`
        : `${API_URL}/absences`;
      const authStore = useAuthStore();
      const absenceStore = useAbsenceStore();

      const { data, error } = await useFetch(uri, {
        method: action === 'create' ? 'POST' : 'PATCH',
        body: {
          company_id: absenceStore.selectedCompanyId,
          type_id: selectedTypeId,
          start_at: absenceDates.startDate,
          end_at: absenceDates.endDate,
          user_id: authStore.user.id,
        },
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
        },
        onResponse({ response }) {
          if (response.status === 204) {
            return null;
          }
        },
        onResponseError({ response }) {
          const errorMessage = response._data || 'Failed to submit absence';
          throw new Error(errorMessage);
        },
      });

      if (error.value) {
        throw new Error(error.value.message || 'Failed to submit absence');
      }

      return data.value;
    },
    onMutate: () => {
      isSubmitting.value = true;
      submitSuccess.value = false;
      submitError.value = null;
    },
    onSuccess: () => {
      submitSuccess.value = true;
      queryClient.invalidateQueries({ queryKey: ['absences'] });
    },
    onError: (error: any) => {
      submitError.value = error;
    },
    onSettled: () => {
      isSubmitting.value = false;
    },
  });

  function submitAbsence(absenceForm: AbsenceForm) {
    mutation.mutate(absenceForm);
  }

  return { isSubmitting, submitSuccess, submitError, submitAbsence };
}
