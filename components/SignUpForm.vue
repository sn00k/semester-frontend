<script setup lang="ts">
import type { Invitation } from '~/types';

const API_URL = useRuntimeConfig().public.apiUrl;

const props = defineProps<Invitation>();
const form = reactive({
  code: props.code,
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
});

async function handleSubmit(event: Event) {
  if (form.password !== form.password_confirmation) {
    alert('Lösenorden matchar inte');
    return;
  }

  const url = `${API_URL}/users`;
  await useFetch(url, {
    method: 'POST',
    body: form,
  });
}
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-col">
      <h2 class="text-xl font-semibold">Nytt konto</h2>
      <div>Fyll i dina uppgifter</div>
    </div>
    <form class="flex flex-col gap-y-10" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-y-2">
        <label for="email">Email</label>
        <input
          class="rounded-lg px-4 py-3 cursor-not-allowed text-black"
          name="email"
          type="email"
          autocomplete="username"
          disabled
          :value="email"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="password">Lösenord</label>
        <input
          class="rounded-lg px-4 py-3 text-black"
          name="password"
          type="password"
          autocomplete="new-password"
          v-model="form.password"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="password-confirmation">Bekräfta lösenord</label>
        <input
          class="rounded-lg px-4 py-3 text-black"
          name="password-confirmation"
          type="password"
          autocomplete="new-password"
          v-model="form.password_confirmation"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="first-name">Förnamn</label>
        <input
          class="rounded-lg px-4 py-3 text-black"
          name="first-name"
          type="text"
          v-model="form.first_name"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="last-name">Efternamn</label>
        <input
          class="rounded-lg px-4 py-3 text-black"
          name="last-name"
          type="text"
          v-model="form.last_name"
        />
      </div>
      <button
        type="submit"
        class="mt-2 px-4 py-3 rounded-md bg-yellow-200 text-black"
      >
        Skapa konto
      </button>
      <div class="flex flex-col items-center gap-y-1">
        <p>Har du redan ett konto?</p>
        <p class="border-b-2 border-yellow-200">Logga in</p>
      </div>
    </form>
  </div>
</template>
