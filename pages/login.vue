<script setup lang="ts">
import Card from '~/components/Card.vue';
import LoginForm from '~/components/LoginForm.vue';

definePageMeta({
  layout: 'start',
});
</script>

<template>
  <div class="flex w-11/12 grow px-2 flex-col justify-center gap-y-2">
    <Card class="flex flex-col gap-y-4">
      <LoginForm />
    </Card>
  </div>
</template>
