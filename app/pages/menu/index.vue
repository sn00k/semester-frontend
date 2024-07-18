<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  title: 'Meny',
});
</script>
<template>
  <div class="flex flex-col h-auto">
    <div class="bg-white dark:bg-primary-dark pt-8 pb-2">
      <Headline>
        <template #right>
          <span class="material-icons lg:hidden">notifications</span>
        </template>
      </Headline>
    </div>
    <div class="grow px-4 py-4">
      <Card class="flex items-center gap-x-4">
        <div>
          <img
            class="inline-block size-12 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div class="flex flex-col grow">
          <div class="font-semibold text-lg">Jonas Erlandsson</div>
          <NuxtLink href="/profile" class="text-sm">Visa Profil</NuxtLink>
        </div>
        <div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </Card>
      <Card class="flex items-center gap-x-4">
        <NuxtLink href="/menu/settings" class="grow font-semibold">
          <span class="text-lg">Inställningar</span>
        </NuxtLink>
        <div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </Card>
      <Card class="flex items-center gap-x-4">
        <NuxtLink href="/menu/gdpr" class="grow font-semibold">
          <span class="text-lg">GDPR</span>
        </NuxtLink>
        <div>
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </Card>
    </div>
    <div class="flex items-center justify-center">
      <button class="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Logga ut
      </button>
    </div>
  </div>
</template>
