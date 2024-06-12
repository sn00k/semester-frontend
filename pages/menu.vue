<script lang="ts" setup>

</script>
<template>
  <div class="flex">
    <span v-if="$colorMode.value === 'dark'" @click="$colorMode.preference = 'light'" class="size-5 self-center text-slate-500 material-icons cursor-pointer">light_mode</span>
    <span v-else @click="$colorMode.preference = 'dark'" class="size-5 self-center text-slate-500 material-icons cursor-pointer">dark_mode</span>
  </div>
</template>