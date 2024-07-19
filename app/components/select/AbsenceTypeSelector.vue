<script setup lang="ts">
import { Card } from '~/components/card';
import type { AbsenceType } from '~/types';

const props = defineProps<{
  absenceTypes: AbsenceType[];
  selectedAbsenceType: string | null;
  selectedTypeId: string | null;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedAbsenceType', value: string): void;
  (e: 'update:selectedTypeId', value: string): void;
}>();

const showAbsenceTypes = ref(false);

function toggleDropdown() {
  showAbsenceTypes.value = !showAbsenceTypes.value;
}

function handleSelection(absenceType: AbsenceType) {
  emit('update:selectedAbsenceType', absenceType.name);
  emit('update:selectedTypeId', absenceType.id);
  toggleDropdown();
}
</script>

<template>
  <Card class="py-0">
    <div
      class="flex py-3 px-2 justify-between cursor-pointer"
      @click="toggleDropdown"
    >
      <h2>{{ selectedAbsenceType || placeholder }}</h2>
      <span class="material-icons">
        {{ showAbsenceTypes ? 'expand_less' : 'expand_more' }}
      </span>
    </div>
    <Transition
      class="transition-all duration-500 overflow-hidden"
      enter-from-class="transform scale-95 opacity-0 max-h-0"
      enter-to-class="transform scale-100 opacity-100 max-h-[1000px]"
      leave-from-class="transform scale-100 opacity-100 max-h-[1000px]"
      leave-to-class="transform scale-95 opacity-0 max-h-0"
    >
      <div v-show="showAbsenceTypes" class="flex flex-col">
        <div
          v-for="absenceType in absenceTypes"
          :key="absenceType.id"
          class="flex p-3 gap-x-3 items-center"
        >
          <input
            :class="[
              'dark:checked:ring-accent-dark dark:focus:checked:ring-offset-accent-dark dark:focus:checked:ring-accent-dark dark:focus:ring-white dark:focus:ring-offset-white radio-button dark:focus:border-accent-dark dark:checked:ring-offset-accent-dark dark:hover:border-accent-dark ring-2 dark:border-accent-dark dark:checked:after:bg-accent-dark dark:bg-neutral-900 bg-white dark:ring-white dark:checked:bg-transparent',
              'checked:focus:ring-offset-transparent focus:ring-offset-black checked:bg-white checked:ring-offset-accent-light focus:ring-black checked:focus:ring-accent-light ring-offset-black dark:ring-offset-white text-accent-light border-0 ring-offset-2 focus:checked:bg-white focus:border-accent-light hover:border-black hover:checked:bg-white checked:ring-accent-light border-black checked:after:bg-accent-light ring-black',
            ]"
            type="radio"
            :id="absenceType.id"
            :value="absenceType.id"
            name="absenceType"
            @change="handleSelection(absenceType)"
          />
          <label class="cursor-pointer" :for="absenceType.id">{{
            absenceType.name
          }}</label>
        </div>
      </div>
    </Transition>
  </Card>
</template>

<style scoped>
.radio-button {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  outline: none;
  position: relative;
}

.radio-button:checked::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
