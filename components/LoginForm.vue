<template>
  <div>
    <h2 class="text-xl font-semibold">Välkommen!</h2>
    <div>Logga in för att registrera din ledighet!</div>
  </div>
  <form class="flex flex-col gap-y-6">
    <div class="flex flex-col gap-y-2">
      <label for="email">Email</label>
      <input
        class="rounded-lg px-4 py-3"
        name="email"
        type="email"
        autocomplete="username"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="password">Lösenord</label>
      <input
        class="rounded-lg px-4 py-3"
        name="password"
        type="password"
        autocomplete="current-password"
      />
    </div>
    <button class="mt-2 px-4 py-3 rounded-md bg-yellow-200 text-black">
      Logga in
    </button>
    <div class="flex justify-between">
      <span class="border-b-2 border-yellow-200">Registrera konto</span>
      <span class="border-b-2 border-yellow-200">Glömt lösenord</span>
    </div>
  </form>
</template>
