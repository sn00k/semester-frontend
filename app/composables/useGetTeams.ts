import { useQuery } from '@tanstack/vue-query';
import type { Team, TeamsResponse } from '@/types';

export async function useGetTeams() {
  const API_URL = useRuntimeConfig().public.apiUrl;
  const teams: Ref<Team[]> = ref([]);
  const fetcher = async (): Promise<TeamsResponse> =>
    await fetch(`${API_URL}/teams`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
        Accept: 'application/json',
      },
    }).then((response) => response.json());

  const { data, isFetched } = useQuery({
    queryKey: ['teams'],
    queryFn: fetcher,
  });
  if (!isFetched.value || data.value === undefined) {
    return { teams };
  }
  teams.value = data.value.data;
  return { teams };
}
