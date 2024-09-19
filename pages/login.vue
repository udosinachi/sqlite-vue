<template>
  <div class="flex min-h-full flex-col justify-center py-8 px-4 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Login to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" method="POST" @submit.prevent="handleLogin">
        <div v-if="error" class="border bg-red-200 rounded-md p-1.5">
          <p class="text-sm text-center text-red-600">
            {{ error }}
          </p>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email Address</label
          >
          <div class="mt-2">
            <input
              type="email"
              v-model="emailAddress"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >

            <button
              type="button"
              @click="togglePasswordVisibility"
              class="text-sm text-blue-500 focus:outline-none"
            >
              {{ passwordVisible ? "Hide" : "Show" }}
            </button>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              autocomplete="password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Loader v-if="loading" />
            <span v-else>Login</span>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?

        <NuxtLink
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          to="/signup"
          >Sign Up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "un-auth",
});
import { useAuth } from "~/composables/useAuth";

const { login } = useAuth();
const router = useRouter();

const emailAddress = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const passwordVisible = ref(false);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await login(emailAddress.value, password.value);
    router.push("/dashboard");
  } catch (err: any) {
    error.value = err.error;
  } finally {
    loading.value = false;
  }
};
</script>
