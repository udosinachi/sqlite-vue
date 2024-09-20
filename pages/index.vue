<template>
  <div class="container mx-auto max-w-7xl p-4">
    <DashboardCards />
    <div class="mt-6" v-if="isModerator()">
      <UserTable :users="users" @reload="fetchData()" />
    </div>

    <DashboardCharts v-if="isUser()" />
  </div>
</template>
<script lang="ts" setup>
const { data, status, signOut } = useAuth();
const { users, fetchUsers } = useEndpoints();

const userStat = data.value.user.role;
console.log(userStat);
const { isAdmin, isModerator, isUser } = useRoleCheck(userStat);

const fetchData = () => {
  fetchUsers();
};

fetchData();
</script>
