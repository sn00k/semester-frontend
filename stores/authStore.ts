import { defineStore } from 'pinia';

type AuthState = {
  isAuthenticated: boolean;
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
  }),
  actions: {
    setAuthUser(authStatus: boolean) {
      this.isAuthenticated = authStatus;
    },
  },
});
