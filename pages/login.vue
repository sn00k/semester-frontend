<script setup lang="ts">
import Card from '~/components/Card.vue';
definePageMeta({
  layout: 'start',
});
</script>

<template>
  <div class="flex w-11/12 grow px-2 flex-col justify-center gap-y-2">
    <Card class="flex flex-col gap-y-4">
      <div>
        <h2 class="text-xl font-semibold">Välkommen!</h2>
        <div>Logga in för att registrera din ledighet!</div>
      </div>
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <label for="email">Email</label>
          <ClientOnly>
            <input
              class="rounded-lg px-4 py-3"
              name="email"
              type="email"
              placeholder="Email"
            />
          </ClientOnly>
        </div>
        <div class="flex flex-col gap-y-2">
          <label for="password">Lösenord</label>
          <ClientOnly>
            <input
              class="rounded-lg px-4 py-3"
              name="password"
              type="password"
              placeholder="Lösenord"
            />
          </ClientOnly>
        </div>
        <button class="mt-2 px-4 py-3 rounded-md bg-yellow-200 text-black">
          Logga in
        </button>
        <div class="flex justify-between">
          <span class="border-b-2 border-yellow-200">Registrera konto</span>
          <span class="border-b-2 border-yellow-200">Glömt lösenord</span>
        </div>
      </div>
    </Card>
  </div>
</template>
