<script setup lang="ts">
import Loading from '~/components/Loading.vue';
import Card from '~/components/Card.vue';
import { useAuthStore } from '~/stores/authStore';
import { storeToRefs } from 'pinia';
import type { User } from '~/types';
type LoginData = {
  type: string;
  accessToken: string;
  user: User;
};

const API_URL = useRuntimeConfig().public.apiUrl;
const authStore = useAuthStore();
const { setUser } = authStore;
const loading = ref(false);
const email = ref('');
const password = ref('');
const errors = ref();

async function handleLogin() {
  loading.value = true;
  const { data, error } = await useFetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  });

  if (error.value || !data.value) {
    console.error(error);
    loading.value = false;
    errors.value = error.value?.data?.message || 'Okänt fel';
    return;
  }
  const loginData = data.value as LoginData;
  setUser(loginData.user);
  useCookie('token', {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  }).value = loginData.accessToken;
  
  const { isAuthenticated } = storeToRefs(authStore);
  if (isAuthenticated.value) navigateTo('/');
}

watchEffect(() => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  if (isAuthenticated.value) navigateTo('/');
});
</script>

<template>
  <div>
    <Loading v-if="loading" />
    <Card v-else>
      <div>
        <h2 class="text-xl font-semibold">Välkommen!</h2>
        <div>Logga in för att registrera din ledighet!</div>
      </div>
      <form class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <label for="email">Email</label>
          <input
            class="rounded-lg px-4 py-3 text-black"
            name="email"
            type="email"
            autocomplete="username"
            v-model="email"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <label for="password">Lösenord</label>
          <input
            class="rounded-lg px-4 py-3 text-black"
            name="password"
            type="password"
            autocomplete="current-password"
            v-model="password"
          />
        </div>
        <div v-if="errors">
          <div class="text-red-500">Fel vid inloggning</div>
          <div>{{ errors }}</div>
        </div>
        <button
          @click.prevent="handleLogin"
          class="mt-2 px-4 py-3 rounded-md bg-yellow-200 text-black"
        >
          Logga in
        </button>
        <div class="flex justify-between">
          <span class="border-b-2 border-yellow-200">Registrera konto</span>
          <span class="border-b-2 border-yellow-200">Glömt lösenord</span>
        </div>
      </form>
    </Card>
  </div>
</template>
