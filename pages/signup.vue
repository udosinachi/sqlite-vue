<template>
  <div class="flex min-h-full flex-col justify-center py-8 px-4 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign up to Udo Users
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSignup" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              type="email"
              autocomplete="email"
              v-model="emailAddress"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-1">
            <input
              type="text"
              v-model="firstName"
              autocomplete="firstName"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >
          <div class="mt-1">
            <input
              type="text"
              v-model="lastName"
              autocomplete="lastName"
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
          <div class="mt-1">
            <input
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="password && password.length <= 7"
            class="mt-2 text-sm text-red-600"
          >
            Passwords must contain at least 8 characters
          </p>

          <div class="flex items-center justify-between mt-4">
            <label
              for="confirm-password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirm Password</label
            >
            <button
              type="button"
              @click="toggleConfirmPasswordVisibility"
              class="text-sm text-blue-500 focus:outline-none"
            >
              {{ confirmPasswordVisible ? "Hide" : "Show" }}
            </button>
          </div>
          <div class="mt-1">
            <input
              v-model="confirmPassword"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="confirmPassword && !passwordsMatch"
            class="mt-2 text-sm text-red-600"
          >
            Passwords do not match.
          </p>
        </div>

        <div v-if="error" class="border bg-red-200 rounded-md p-1.5">
          <p class="text-sm text-center text-red-600">
            {{ error }}
          </p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading || password.length <= 7 || !passwordsMatch"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Loader v-if="loading" />
            <span v-else>Sign Up</span>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?

        <NuxtLink
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          to="/login"
          >Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

const { signIn } = useAuth();

const emailAddress = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const role = ref("User");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const loading = ref(false);

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const passwordsMatch = computed(() => password.value === confirmPassword.value);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

const handleSignup = async () => {
  try {
    let url = "http://localhost:3000/api/auth/register";
    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailAddress.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        role: role.value,
      }),
    };

    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(`Registration failed: ${resp.statusText}`);
    }

    const user = await resp.json();

    const signResp = await signIn("credentials", {
      email: emailAddress.value,
      password: password.value,
      redirect: false,
      callbackUrl: "/",
    });

    if (signResp?.error) {
      throw new Error(`Sign-in failed: ${(signResp as any).error}`);
    }

    return navigateTo((signResp as any).url, { external: true });
  } catch (err: any) {
    error.value = err.message;
  } finally {
  }
};
</script>
