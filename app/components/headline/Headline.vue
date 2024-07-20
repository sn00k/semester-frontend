<script lang="ts" setup>
const route = useRoute();
</script>
<template>
  <!-- Page title -->
  <div class="flex justify-between p-4">
    <div class="flex gap-x-4 items-center justify-between">
      <slot name="left"></slot>
      <h1 class="text-2xl font-bold text-center dark:text-white text-black">
        {{ route.meta.title }}
      </h1>
      <slot name="tabs"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
