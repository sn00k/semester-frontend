<script lang="ts" setup>
const route = useRoute();
</script>
<template>
  <!-- Page title -->
  <div class="flex justify-between p-4">
    <div class="flex gap-x-4 items-center justify-between">
      <slot name="left"></slot>
      <div class="flex max-lg:flex-col items-center lg:gap-x-4">
        <h1
          class="text-2xl font-bold text-center dark:text-white text-black lg:mr-4"
        >
          {{ route.meta.title }}
        </h1>
        <slot name="tabs"></slot>
      </div>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
