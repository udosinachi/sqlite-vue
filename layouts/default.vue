<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-1">
      <AuthNavbar v-if="status === 'authenticated'" />
      <UnAuthNavbar v-else />
      <div>
        <slot />
      </div>
    </div>
    <div class="pb-2">
      <Footer />
    </div>
  </div>
</template>

<script setup>
const { status } = useAuth();
</script>

<style lang="scss" scoped></style>
