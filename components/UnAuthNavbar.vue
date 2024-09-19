<template>
  <div>
    <header class="shadow-sm bg-white py-1">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold text-lg text-indigo-600"
          >Udo Uploads</NuxtLink
        >
        <ul class="flex gap-4">
          <li>
            <NuxtLink class="btn2" to="/login">Login</NuxtLink>
          </li>
          <li>
            <NuxtLink class="btn" to="/signup">Sign Up</NuxtLink>
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  </div>
</template>
