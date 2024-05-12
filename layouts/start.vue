<script setup lang="ts">
import { useCurrentPage } from '~/composables/useCurrentPage';

const { currentPage } = useCurrentPage();
</script>

<template>
  <div
    class="bg-primary w-screen h-auto min-h-screen text-white flex flex-col gap-y-4"
    :class="
      currentPage === 'login'
        ? 'items-center py-2'
        : 'items-center justify-center'
    "
  >
    <div class="flex gap-x-2">
      <h1 class="text-2xl">Semesterappen</h1>
      <span class="size-5 self-center text-yellow-200 material-icons">favorite</span>
    </div>
    <slot />
  </div>
</template>
