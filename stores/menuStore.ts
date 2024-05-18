import { defineStore } from 'pinia';

type MenuItem = {
  hide?: boolean;
  icon: string;
  name: string;
  route: string;
};

export const useMenuStore = defineStore('menu', () => {
  const isAdmin = true;
  const menuItems: Ref<MenuItem[]> = ref([
    {
      icon: 'fact_check',
      name: 'To-do',
      hide: !isAdmin,
      route: '/todo',
    },
    { icon: 'add', name: 'Ny frånvaro', route: '/absences/new' },
    { icon: 'beach_access', name: 'Min tid', route: '/' },
    { icon: 'calendar_month', name: 'Översikt', route: '/overview' },
    { icon: 'more_horiz', name: 'Meny', route: '/menu' },
  ]);

  return { menuItems };
});
