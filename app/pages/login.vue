<script setup lang="ts">
import Card from '~/components/Card.vue';
import LoginForm from '~/components/LoginForm.vue';
import { useAuthStore } from '~/stores/authStore';
import { storeToRefs } from 'pinia';

definePageMeta({
  layout: 'start',
});

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
if (isAuthenticated.value) navigateTo('/');
</script>

<template>
  <div class="flex w-11/12 grow px-2 flex-col justify-center gap-y-2">
    <LoginForm />
  </div>
</template>
