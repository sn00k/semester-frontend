<script setup lang="ts">
import Card from '@/components/Card.vue';
import Footer from '@/components/Footer.vue';

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div>
    <Card>
      <h1>My time</h1>
    </Card>
  </div>
  <Footer />
</template>
