<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-2 px-4">ID</th>
          <th class="py-2 px-4">Email</th>
          <th class="py-2 px-4">First Name</th>
          <th class="py-2 px-4">Last Name</th>
          <th class="py-2 px-4">Role</th>
          <th v-if="isModerator()" class="py-2 px-4">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users.users"
          :key="user.id"
          class="border-b border-gray-200"
        >
          <td class="py-2 px-4 text-center">{{ user.id }}</td>
          <td class="py-2 px-4 text-center">{{ user.email }}</td>
          <td class="py-2 px-4 text-center">{{ user.firstName }}</td>
          <td class="py-2 px-4 text-center">{{ user.lastName }}</td>
          <td class="py-2 px-4 text-center">{{ user.role }}</td>
          <td class="py-2 px-4 text-center" v-if="isModerator()">
            <button
              @click="editUser(user.id)"
              class="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              v-if="isAdmin()"
              @click="handleDelete(user.id)"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { updateUser, deleteUser } = useEndpoints();
const { data, status, signOut } = useAuth();

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const userStat = data.value.user.role;
console.log(userStat);
const { isAdmin, isModerator, isUser } = useRoleCheck(userStat);

const Emit = defineEmits(["reload"]);

const handleDelete = (id: number) => {
  deleteUser(id);
  Emit("reload");
};
</script>
