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

function selectTeam(teamId: string) {
  selectedteamId.value = teamId;
}
</script>
<template>
  <div>
    <header class="dark:bg-primary-dark p-4 lg:bg-primary-light bg-white">
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
      <div class="flex justify-center">
        <div
          class="flex items-center justify-between w-3/4 rounded-full bg-primary-light"
        >
          <span
            v-for="team in teams.data"
            :key="team.id"
            :class="{
              'rounded-full bg-blue-500 text-white': team.id === selectedteamId,
            }"
            @click="selectTeam(team.id)"
            class="px-4 py-2"
          >
            {{ team.name }}
          </span>
        </div>
      </div>
    </header>
  </div>
</template>
