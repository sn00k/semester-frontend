import { defineStore } from 'pinia';
import { dev } from 'process';
import { Ref, ref } from 'vue';

type Notification = {
  title: string;
  content: string;
  type: string;
  date: string;
  read: boolean;
};
const devNotifications: Notification[] = [
  {
    title: 'Welcome to the app',
    content: 'This is a notification',
    type: 'info',
    date: '2024-07-14 18:00:00',
    read: false,
  },
  {
    title: 'Welcome to the app',
    content: 'This is a notification',
    type: 'info',
    date: '2024-07-18 18:00:00',
    read: true,
  },
  {
    title: 'Welcome to the app',
    content: 'This is a notification',
    type: 'info',
    date: '2024-07-18 16:30:00',
    read: false,
  },
];
export const useNotificationStore = defineStore('notifications', () => {
  const notifications: Ref<Notification[] | null> = ref(devNotifications);

  function readNotification(id: string) {
    const notification = notifications.value?.find((n) => n.title === id);
    if (notification) {
      notification.read = true;
    }
  }

  return { notifications, readNotification };
});
