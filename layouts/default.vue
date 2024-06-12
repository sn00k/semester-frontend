<script setup lang="ts">
import Menu from '~/components/Menu.vue';
</script>

<template>
  <div
    class="max-lg:hidden flex justify-between items-center py-4 lg:py-0 px-2 lg:pl-2 dark:bg-zinc-950 dark:text-white"
  >
    <div class="flex gap-x-2 items-center justify-start py-4">
      <h1 class="text-2xl">Semesterappen</h1>
    </div>
    <div class="flex gap-x-2"></div>
  </div>
  <div
    class="flex flex-col lg:flex-row-reverse bg-white text-black dark:bg-primary dark:text-white w-screen min-h-screen h-auto"
  >
    <div class="flex flex-col grow min-h-full h-auto">
      <!-- Content area-->
      <div class="grow bg-zinc-100 pb-24 dark:bg-[#141414]">
        <NuxtPage />
      </div>
    </div>
    <Menu />
  </div>
</template>
