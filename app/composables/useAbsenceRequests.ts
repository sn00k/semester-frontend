import { useAuthStore } from '~/stores';
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import type { User, Team, TeamResponse } from '@/types'


export function useGetTeams() {
  const API_URL = useRuntimeConfig().public.apiUrl;
  const queryClient = useQueryClient();
  const fetcher = async (): Promise<TeamResponse> =>
  await fetch(`${API_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${useCookie('token').value}`,
      Accept: 'application/json',
    },
  }).then((response) => response.json());

const { data: teams } = useQuery({
  queryKey: ['teams'],
  queryFn: fetcher,
});

return { teams }
}