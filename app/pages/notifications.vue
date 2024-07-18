<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '../stores/notificationStore';
const router = useRouter();
definePageMeta({
  middleware: 'auth',
  title: 'Notiser',
});

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>
<template>
  <div class="flex bg-white dark:bg-primary-dark h-screen">
    <div class="flex flex-col w-full gap-y-4">
      <Headline class="pt-6 pb-4 flex">
        <template #left class="items-center">
          <span
            class="lg:hidden material-icons cursor-pointer"
            @click="$router.back()"
            >arrow_back_ios</span
          >
        </template>
        <template #right>
          <span class="material-icons lg:hidden">notifications</span>
        </template>
      </Headline>
      <div class="flex flex-col gap-y-4">
        <div
          v-for="notification in notifications"
          :key="`${notification.title}-${notification.date.toString()}`"
          class="flex flex-col gap-y-2 p-4"
          :class="notification.read ? 'bg-gray-200' : ''"
        >
          <div class="px-2">
            <div class="flex">
              <div class="flex items-center">
                <div v-if="notification.read" class="pr-2">
                  <span
                    class="material-icons size-3 rounded-full bg-red-600"
                  ></span>
                </div>
              </div>
              <div class="grow flex flex-col justify-between">
                <h3 class="text-lg font-semibold">{{ notification.title }}</h3>
                <span v-text="notification.content"></span>
              </div>
              <div>
                <span>{{ $dayjs(notification.date).fromNow(true) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
