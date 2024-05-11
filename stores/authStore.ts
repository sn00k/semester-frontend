import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = computed(() => {
    return useCookie('token', { default: () => null }).value !== null;
  });

  return { isAuthenticated };
});
