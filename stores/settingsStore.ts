import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
const isDarkMode = useStorage('isDarkMode', false) // returns Ref<boolean>

  return { isDarkMode };

});
