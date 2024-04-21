<template>
  <div>
    <h2 class="text-xl font-semibold">Nytt konto</h2>
    <div>Fyll i dina uppgifter</div>
  </div>
  <form class="flex flex-col gap-y-10">
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
        autocomplete="new-password"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="confirm-password">Bekräfta lösenord</label>
      <input
        class="rounded-lg px-4 py-3"
        name="confirm-password"
        type="password"
        autocomplete="new-password"
      />
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="first-name">Förnamn</label>
      <input class="rounded-lg px-4 py-3" name="first-name" type="text" />
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="last-name">Efternamn</label>
      <input class="rounded-lg px-4 py-3" name="last-name" type="text" />
    </div>
    <div class="flex flex-col gap-y-2">
      <label for="company-id">FöretagsID</label>
      <input class="rounded-lg px-4 py-3" name="company-id" type="text" />
    </div>
    <button class="mt-2 px-4 py-3 rounded-md bg-yellow-200 text-black">
      Skapa konto
    </button>
    <div class="flex flex-col items-center gap-y-1">
      <p>Har du redan ett konto?</p>
      <p class="border-b-2 border-yellow-200">Logga in</p>
    </div>
  </form>
</template>
