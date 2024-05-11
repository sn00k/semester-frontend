import { defineStore } from 'pinia';
import {
  PlusIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  BeakerIcon,
} from '@heroicons/vue/24/solid';

type MenuItem = {
  hide?: boolean;
  icon: Component;
  name: string;
  route: string;
};

export const useMenuStore = defineStore('menu', () => {
  const isAdmin = true;
  const menuItems: Ref<MenuItem[]> = ref([
    {
      icon: ListBulletIcon,
      name: 'To-do',
      hide: !isAdmin,
      route: '/todo',
    },
    { icon: PlusIcon, name: 'Ny frånvaro', route: '/absence/new' },
    { icon: BeakerIcon, name: 'Min tid', route: '/' },
    { icon: CalendarDaysIcon, name: 'Översikt', route: '/overview' },
    { icon: EllipsisHorizontalIcon, name: 'Meny', route: '/menu' },
  ]);

  return { menuItems };
});
