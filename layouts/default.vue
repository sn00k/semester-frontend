<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="bg-primary w-screen h-screen text-white">
    <div class="flex gap-x-2">
      <h1 class="text-2xl">Semesterappen</h1>
      <HeartIcon class="size-5 self-center text-yellow-200" />
    </div>
    <slot />
  </div>
</template>
