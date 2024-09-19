<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-1">
      <AuthNavbar />
      <div>
        <slot />
      </div>
    </div>
    <div class="pb-2">
      <Footer />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
