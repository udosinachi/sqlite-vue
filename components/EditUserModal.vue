<template>
  <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-2xl font-semibold mb-4">Edit User</h2>
        <form @submit.prevent="submitEdit">
          <!-- <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="email"
              >Email</label
            >
            <input
              v-model="form.email"
              class="w-full px-3 py-2 border rounded"
              type="email"
              id="email"
              required
            />
          </div> -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="firstname"
              >First Name</label
            >
            <input
              v-model="form.firstName"
              class="w-full px-3 py-2 border rounded"
              type="text"
              id="firstname"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="lastname"
              >Last Name</label
            >
            <input
              v-model="form.lastName"
              class="w-full px-3 py-2 border rounded"
              type="text"
              id="lastname"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="role"
              >Role</label
            >
            <select v-model="form.role" class="w-full px-3 py-2 border rounded">
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const { updateUser } = useEndpoints();
const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const form = ref({ email: "", firstName: "", lastName: "", role: "" });

// Watch for changes to user prop and update form values accordingly
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = { ...newUser };
    }
  },
  { immediate: true }
);

const submitEdit = () => {
  updateUser(props.user.id, form.value);
  closeModal();
};

const closeModal = () => {
  emit("close");
};
</script>
