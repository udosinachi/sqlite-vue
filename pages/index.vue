<template>
  <div class="container mx-auto max-w-7xl p-4">
    <P>{{ JSON.stringify(data) }}</P>
    <P>{{ status }}</P>

    <!-- <pre>{{ JSON.stringify(users, null, 3) }}</pre> -->

    <div>
      <UserTable
        :users="users"
        :isAdmin="false"
        @editUser="handleEdit"
        @deleteUser="handleDelete"
      />
    </div>

    <button @click="signOut">Signout</button>
    <DashboardCards />
    <DashboardCharts />
  </div>
</template>
<script lang="ts" setup>
const { data, status, signOut } = useAuth();

const { data: users } = useFetch("/api/users");
</script>
