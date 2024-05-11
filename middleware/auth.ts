import { useAuthStore } from '~/stores/authStore';
import type { Context } from '@nuxt/types';
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore();
  const { isAuthenticated } = storeToRefs(store);
  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
});
