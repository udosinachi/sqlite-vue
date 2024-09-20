<template>
  <div class="container mx-auto max-w-7xl p-4">
    <DashboardCards />
    <div class="mt-6">
      <UserTable :users="users" :isAdmin="true" @reload="fetchData()" />
    </div>

    <!-- <DashboardCharts /> -->
  </div>
</template>
<script lang="ts" setup>
const { data, status, signOut } = useAuth();
const { users, fetchUsers } = useEndpoints();

const fetchData = () => {
  fetchUsers();
};

fetchData();
</script>
