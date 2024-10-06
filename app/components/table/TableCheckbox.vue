<script setup lang="ts">
const props = defineProps<{
  indeterminate?: boolean;
  className?: string;
}>();

const { indeterminate, className } = toRefs(props);

const inputRef = ref<any>(null);
</script>

<template>
  <input
    type="checkbox"
    ref="inputRef"
    :class="`${className} cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`"
    :indeterminate="indeterminate"
    v-bind="$attrs"
  />
</template>
