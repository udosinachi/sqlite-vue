<template>
  <div class="container mx-auto max-w-7xl p-4">
    <DashboardCards />
    <DashboardCharts />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth-layout",
});
</script>
