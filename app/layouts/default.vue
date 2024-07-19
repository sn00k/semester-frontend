<script setup lang="ts">
import { Menu } from '@/components/menu';
</script>

<template>
  <div
    class="max-lg:hidden flex justify-between items-center py-4 lg:py-0 px-2 lg:pl-2 dark:bg-zinc-950 dark:text-white"
  >
    <div class="flex gap-x-2 items-center justify-start py-4">
      <h1 class="text-2xl">Semesterappen</h1>
    </div>
    <div class="flex gap-x-2">
      <img
        class="inline-block size-8 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  </div>
  <div
    class="flex flex-col lg:flex-row-reverse grow bg-white text-black dark:bg-primary dark:text-white"
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
