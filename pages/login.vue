<script setup lang="ts">
import Card from '~/components/Card.vue';
import LoginForm from '~/components/LoginForm.vue';
import SignUpForm from '~/components/SignUpForm.vue';

definePageMeta({
  layout: 'start',
});

// When this is replaced with server-side authentication,
// we can also likely remove <ClientOnly> from the template
const authUser = ref(false);
</script>

<template>
  <div class="flex w-11/12 grow px-2 flex-col justify-center gap-y-2">
    <Card class="flex flex-col gap-y-4">
      <ClientOnly>
        <template v-if="authUser">
          <LoginForm />
        </template>
        <template v-else>
          <SignUpForm />
        </template>
      </ClientOnly>
    </Card>
  </div>
</template>
