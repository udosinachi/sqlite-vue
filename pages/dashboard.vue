<template>
  <div class="container mx-auto max-w-7xl p-4">
    <DashboardCards />
    <DashboardCharts />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "auth-layout",
  middleware: "auth",
});

import { useCookie } from "#app";

const userCookie = useCookie<any | null>("user");
const userData = userCookie.value as any | null;

const { user } = userData || {};
</script>
