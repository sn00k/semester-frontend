import { defineStore } from 'pinia';
import type { User } from '~/types';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User> = useStorage('user', {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    email_verified_at: '',
    updated_at: '',
    created_at: '',
  });

  const isAuthenticated = computed(() => {
    return useCookie('token', { default: () => null }).value !== null;
  });

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  return { isAuthenticated, user, setUser };
});
