<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid';
import { useCurrentPage } from '~/composables/useCurrentPage';

const { currentPage } = useCurrentPage();
console.log(currentPage);
</script>

<template>
  <div
    class="bg-primary w-screen h-screen text-white flex flex-col"
    :class="
      currentPage === 'login'
        ? 'items-center py-2'
        : 'items-center justify-center'
    "
  >
    <div class="flex gap-x-2">
      <h1 class="text-2xl">Semesterappen</h1>
      <HeartIcon class="size-5 self-center text-yellow-200" />
      <slot />
    </div>
  </div>
</template>
