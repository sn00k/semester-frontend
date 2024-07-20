<script setup lang="ts">
const props = defineProps({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fullName: {
    type: String,
  },
});
const initials = computed(() => {
  if (props.fullName) {
    return props.fullName
      .split(' ')
      .map((name) => name[0])
      .join('');
  }
  if (props.firstName && props.lastName) {
    return `${props.firstName[0]}${props.lastName[0]}`;
  }
  return '';
});
</script>
<template>
  <div class="rounded-full bg-gray-300 p-1 w-8 h-8 text-center">
    {{ initials }}
  </div>
</template>
