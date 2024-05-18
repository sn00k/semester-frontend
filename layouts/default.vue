<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="bg-primary-light text-black dark:bg-primary-dark dark:text-white h-screen"
  >
    <div class="flex flex-col min-h-full h-auto">
      <div class="flex justify-between items-center py-4 px-2">
        <div class="flex gap-x-2 items-center justify-start py-4">
          <h1 class="text-2xl">Semesterappen</h1>
          <span class="size-5 self-center dark:text-yellow-300 material-icons"
            >favorite</span
          >
        </div>
        <div class="flex gap-x-2">
          <ClientOnly>
            <span
              v-if="$colorMode.value === 'dark'"
              @click="$colorMode.value = 'light'"
              class="size-5 self-center text-slate-500 material-icons cursor-pointer"
              >light_mode</span
            >
            <span
              v-else
              @click="$colorMode.value = 'dark'"
              class="size-5 self-center text-slate-500 material-icons cursor-pointer"
              >dark_mode</span
            >
          </ClientOnly>
        </div>
      </div>
      <div class="flex justify-between p-4">
        <div class="flex gap-x-4 items-center">
          <img
            class="inline-block size-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h1 class="text-2xl font-bold text-center">{{ route.meta.title }}</h1>
        </div>
        <div>
          <span class="material-icons">notifications</span>
        </div>
      </div>
      <div class="grow bg-primary-light dark:bg-primary-dark pb-24">
        <NuxtPage />
      </div>
      <Footer />
    </div>
  </div>
</template>
