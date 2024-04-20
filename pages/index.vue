<script setup lang="ts">
const { data } = await useFetch("http://semester-api.test/api/absences");
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <div>data: {{ data }}</div>
  </div>
</template>
