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
    mutationFn: async ({ absenceId }: { absenceId: string }) => {
      const API_URL = useRuntimeConfig().public.apiUrl;
      const uri = `${API_URL}/absences/${absenceId}`;

      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('token').value}`,
          'Content-Type': 'application/json',
        },
      });

      // If the response is 204, there's no content to parse
      if (response.status === 204) {
        return null;
      }

      // Attempt to parse the response as JSON
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || 'Failed to submit absence');
      }

      return json;
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

  function deleteAbsence({ absenceId }: { absenceId: string }) {
    mutation.mutate({ absenceId });
  }

  return { isDeleting, deleteSuccess, deleteError, deleteAbsence };
}
