import { useQueryClient, useMutation } from '@tanstack/vue-query';

type AbsenceDelete = {
  absenceId: string;
};

export function useDeleteAbsence() {
  const queryClient = useQueryClient();
  const isDeleting = ref(false);
  const deleteSuccess = ref(false);
  const deleteError = ref<Error | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ absenceId }: AbsenceDelete) => {
      const API_URL = useRuntimeConfig().public.apiUrl;
      const uri = `${API_URL}/absences/${absenceId}`;

      const { data, error } = await useFetch(uri, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
        },
        onResponse({ response }) {
          if (response.status === 204) {
            return null;
          }
        },
        onResponseError({ response }) {
          const errorMessage = response._data || 'Failed to delete absence';
          throw new Error(errorMessage);
        },
      });

      if (error.value) {
        throw new Error(error.value.message || 'Failed to delete absence');
      }

      return data.value;
    },
    onMutate: () => {
      isDeleting.value = true;
      deleteSuccess.value = false;
      deleteError.value = null;
    },
    onSuccess: () => {
      deleteSuccess.value = true;
      queryClient.invalidateQueries({ queryKey: ['absences'] });
    },
    onError: (error: any) => {
      deleteError.value = error;
    },
    onSettled: () => {
      isDeleting.value = false;
    },
  });

  function deleteAbsence(absenceForm: AbsenceDelete) {
    mutation.mutate(absenceForm);
  }

  return { isDeleting, deleteSuccess, deleteError, deleteAbsence };
}
