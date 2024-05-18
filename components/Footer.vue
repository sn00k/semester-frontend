<script setup lang="ts">
import { useMenuStore } from '~/stores/menuStore';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { menuItems } = storeToRefs(menuStore);
</script>

<template>
  <div
    class="flex justify-between bg-gray-800 text-white fixed inset-x-0 bottom-0"
  >
    <template v-for="item in menuItems" :key="item.name">
      <template v-if="!item.hide">
        <router-link
          :to="item.route"
          :key="item.name"
          active-class="border-t-2 border-t-yellow-400 text-yellow-400"
          class="flex px-2 py-4 text-sm flex-col items-center justify-center"
        >
          <span class="size-6 material-icons" v-html="item.icon"></span>
          <span>{{ item.name }}</span>
        </router-link>
      </template>
    </template>
  </div>
</template>
