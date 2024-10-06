import { useQueryClient, useQuery } from '@tanstack/vue-query';
import type { AbsenceResponse } from '@/types';

export function useGetAbsenceRequests(teamId: string) {
  const API_URL = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();
  const fetcher = async (): Promise<AbsenceResponse> =>
    await fetch(`${API_URL}/teams/${teamId}/absences`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
        Accept: 'application/json',
      },
    }).then((response) => response.json());

  const { data: absenceRequests } = useQuery({
    queryKey: ['absenceRequests', teamId],
    queryFn: fetcher,
  });

  return { absenceRequests };
}
