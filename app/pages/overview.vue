<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  title: 'Översikt',
});
const API_URL = useRuntimeConfig().public.apiUrl;
const selectedteamId: Ref<string | null> = ref(null);
const {
  data: teams,
  status,
  error,
  refresh,
} = await useFetch(`${API_URL}/teams`, {
  headers: {
    Authorization: `Bearer ${useCookie('token').value}`,
    Accept: 'application/json',
  },
});
watchEffect(() => {
  if (status.value === 'success') {
    selectedteamId.value = teams.value.data[0].id;
  }
});
</script>
<template>
  <div>
    <header class="bg-white dark:bg-primary-dark p-4">
      <Headline>
        <template #left>
          <img
            class="inline-block size-6 rounded-full ring-2 ring-white lg:hidden"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </template>
        <template #right>
          <NuxtLink to="/notifications">
            <span class="material-icons lg:hidden">notifications</span>
          </NuxtLink>
        </template>
      </Headline>
      <div v-for="team in teams.data" :key="team.id">
        <span>{{ team.name }}</span>
      </div>
    </header>
  </div>
</template>
