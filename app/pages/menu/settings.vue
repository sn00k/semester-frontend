<script lang="ts" setup>
import Switch from '~/components/switch/Switch.vue';

// import { Switch } from '@/components/switch';
definePageMeta({
  middleware: 'auth',
  title: 'Inställningar',
});
</script>
<template>
  <Headline>
    <template #right>
      <span class="material-icons lg:hidden">notifications</span>
    </template>
  </Headline>
  <div class="flex flex-col">
    <div class="flex items-center justify-between px-2">
      <div
        class="flex flex-col grow"
        @click="
          $colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'
        "
      >
        <span>Dark Mode</span>
        <span class="text-xs text-gray-500">Enable dark mode</span>
      </div>
      <div>
        <ClientOnly>
          <Switch
            @update:checked="
              $colorMode.preference =
                $colorMode.value === 'dark' ? 'light' : 'dark'
            "
            :checked="$colorMode.value === 'dark'"
            true-value="dark"
            false-value="light"
          />
        </ClientOnly>
        <!-- <span
          v-if="$colorMode.value === 'dark'"
          @click="$colorMode.preference = 'light'"
          class="size-5 self-center text-accent-dark material-icons cursor-pointer"
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
  </div>
</template>
