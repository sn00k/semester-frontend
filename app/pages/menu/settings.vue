<script lang="ts" setup>
import { Switch } from '@/components/switch';

const handleChange = () => {
  if (useColorMode().value === 'dark') {
    useColorMode().preference = 'light';
  } else {
    useColorMode().preference = 'dark';
  }
};

const switchChecked = computed(() => {
  return useColorMode().value === 'dark';
});
</script>
<template>
  <div
    class="flex dark:bg-[#202020] bg-white justify-between lg:w-1/2 md:w-2/3 w-full p-4"
  >
    <div>
      <h1 class="text-xl font-bold">Dark mode</h1>
    </div>
    <div class="flex">
      <div class="flex items-center space-x-2">
        <ClientOnly>
          <Switch @click="handleChange" :checked="switchChecked" />
        </ClientOnly>
      </div>
      <!-- <span
        v-if="$colorMode.value === 'dark'"
        @click="$colorMode.preference = 'light'"
        class="size-5 self-center text-slate-500 material-icons cursor-pointer"
        >light_mode</span
      >
      <span
        v-else
        @click="$colorMode.preference = 'dark'"
        class="size-5 self-center text-slate-500 material-icons cursor-pointer"
        >dark_mode</span
      > -->
    </div>
  </div>
</template>
