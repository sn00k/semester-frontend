<script setup lang="ts">
import { useMenuStore } from '~/stores/menuStore';
import { storeToRefs } from 'pinia';
const route = useRoute();
const menuStore = useMenuStore();
const { menuItems } = storeToRefs(menuStore);
console.log(route.fullPath);
</script>

<template>
  <div
    class="flex justify-between lg:flex-col lg:justify-start dark:bg-zinc-950 bg-zinc-100 lg:bg-white lg:pl-[1px] dark:text-white lg:relative fixed inset-x-0 bottom-0"
  >
    <template v-for="item in menuItems" :key="item.name">
      <template v-if="!item.hide">
        <router-link
          :to="item.route"
          :key="item.name"
          active-class="border-t-2 lg:border-l-2 lg:border-t-0 lg:dark:border-l-yellow-400 text-blue-500 lg:border-l-blue-500 border-t-blue-500 dark:border-t-yellow-400 dark:text-yellow-400"
          class="inline-flex px-2 py-4 text-sm flex-col items-center justify-center"
        >
          <div
            class="flex flex-col items-center justify-center"
            :class="{ 'lg:-ml-0.5': route.fullPath === item.route }"
          >
            <span class="size-6 material-icons" v-html="item.icon"></span>
            <span>{{ item.name }}</span>
          </div>
        </router-link>
      </template>
    </template>
  </div>
</template>
