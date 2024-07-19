import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { User, Company } from '~/types';
import { useQuery } from '@tanstack/vue-query';

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | null> = useStorage('user', null);

  const API_URL = useRuntimeConfig().public.apiUrl;
  const fetcher = async (): Promise<User> =>
    await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
        Accept: 'application/json',
      },
    }).then((response) => response.json());
  const {
    isPending,
    isError,
    isFetching,
    data: absences,
    error,
    refetch,
  } = useQuery({
    queryKey: ['absences'],
    queryFn: fetcher,
  });

  return { user };
});
