<template>
  <div class="container flex flex-wrap py-6 px-4 mx-auto">
    <div class="mt-7 px-4 md:w-[25%]">
      <h2 class="text-lg font-bold leading-7 text-black">Profile</h2>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-1">
          <p class="text-base font-semibold text-indigo-600">Business Name:</p>
          <p>{{ user.businessName }}</p>
        </div>
        <div class="flex flex-wrap gap-1">
          <p class="text-base font-semibold text-indigo-600">Business Email:</p>
          <p>{{ user.emailAddress }}</p>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="uploadHandler"
      class="container mx-auto max-w-7xl py-6 px-4 md:w-[70%]"
    >
      <div class="space-y-12">
        <div class="pb-12">
          <h2 class="text-lg font-bold leading-7 text-black">
            Upload your business documents here
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This platform will be help you minimal documentation (e.g., business
            license, tax ID).
          </p>

          <div
            v-if="submittedDisplay || fileStore"
            class="border bg-yellow-200 rounded-md p-1.5 mt-10"
          >
            <p class="text-sm text-center text-yellow-600">
              Your document has been uploaded successfully and its currently
              under review. The review will be completed within 48hours
            </p>
          </div>

          <div class="mt-10" v-else>
            <div class="col-span-full border-b border-gray-900/10 pb-10">
              <label
                for="cover-photo"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Upload</label
              >
              <div
                :class="[
                  'mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10',
                  fileAdded ? 'border-green-600' : 'border-gray-900/25',
                ]"
              >
                <div class="text-center">
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <p class="pr-1">
                      {{ fileAdded ? "File added:" : "Click to" }}
                    </p>
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>{{
                        fileAdded ? "Change file" : "Upload a file"
                      }}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        @change="handleFileUpload"
                      />
                    </label>
                  </div>
                  <p
                    v-if="fileName"
                    class="text-xs leading-5 text-gray-600 mt-2"
                  >
                    {{ fileName }}
                  </p>
                  <p
                    v-if="fileAdded"
                    class="text-xs leading-5 font-bold text-green-600 mt-2"
                  >
                    File successfully uploaded.
                  </p>
                  <p v-if="!fileAdded" class="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <button
                    v-if="fileAdded"
                    @click="clearFile"
                    class="mt-4 px-4 py-2 bg-red-500 text-white text-xs rounded"
                  >
                    Clear File
                  </button>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end gap-x-6 mt-5">
              <button
                type="submit"
                :disabled="fileName === ''"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span v-if="loading">Loading...</span>
                <span v-else>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  middleware: "auth",
});

import { useCookie } from "#app";

const userCookie = useCookie("user");
const userData = userCookie.value;

const fileName = ref("");
const fileAdded = ref(false);
const fileBase64 = ref("");
const loading = ref(false);
const submittedDisplay = ref(false);
const fileStore = ref(false);

onMounted(() => {
  const isFileSubmitted = localStorage.getItem("fileSubmitted");
  if (isFileSubmitted) {
    fileStore.value = true;
  } else {
    fileStore.value = false;
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    fileBase64.value = reader.result;
    fileName.value = file.name;
    fileAdded.value = true;
  };
  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };
  reader.readAsDataURL(file);
};

const clearFile = () => {
  fileName.value = "";
  fileAdded.value = false;
  fileBase64.value = "";
};

const uploadHandler = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    submittedDisplay.value = true;
    localStorage.setItem("fileSubmitted", "true");
    fileName.value = "";
    fileBase64.value = "";
    fileAdded.value = false;
  }, 1500);
};

const { user } = userData || {};
</script>
