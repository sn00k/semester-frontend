import { defineStore } from 'pinia';

type MenuItem = {
  hide?: boolean;
  icon: string;
  name: string;
  route: string;
  class: string;
};

export const useMenuStore = defineStore('menu', () => {
  const isAdmin = true;
  const menuItems: Ref<MenuItem[]> = ref([
    {
      icon: 'notifications',
      name: 'Notiser',
      route: '/notifications',
      class: 'max-lg:hidden',
    },
    { icon: 'checklist', name: 'Ärenden', hide: !isAdmin, route: '/cases' },
    { icon: 'add', name: 'Ny frånvaro', route: '/absences/new' },
    { icon: 'beach_access', name: 'Min tid', route: '/' },
    { icon: 'calendar_month', name: 'Översikt', route: '/overview' },
    { icon: 'more_horiz', name: 'Meny', route: '/menu' },
  ]);

  return { menuItems };
});
