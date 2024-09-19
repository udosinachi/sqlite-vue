<template>
  <section class="py-10 md:px-0 mt-10">
    <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
          >
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span class="block xl:inline">Useful Tools to</span>
              <span class="block text-indigo-600 xl:inline">
                Upload documents</span
              >
            </h1>
            <p
              class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"
            >
              It's never been easier to upload business documents for storage
              and proper verification
            </p>
            <div class="relative flex flex-col sm:flex-row sm:space-x-4">
              <NuxtLink
                to="/dashboard"
                class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
              >
                Try It Free
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <div
            class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="w-ful pt-7 pb-7 md:pt-20 md:pb-24">
    <div
      class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16"
    >
      <div
        class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32"
      >
        <h2
          class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl"
        >
          Automated Uploads
        </h2>
        <p
          class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg"
        >
          Save time and money with our revolutionary services. We are the
          leaders in the industry.
        </p>
        <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
          <li
            class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid"
          >
            <span
              class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-600 rounded-full"
              ><span class="text-sm font-bold">✓</span></span
            >
            Automated upload management workflow
          </li>
          <li
            class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid"
          >
            <span
              class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-600 rounded-full"
              ><span class="text-sm font-bold">✓</span></span
            >
            Detailed analytics for your upload
          </li>
          <li
            class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid"
          >
            <span
              class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-indigo-600 rounded-full"
              ><span class="text-sm font-bold">✓</span></span
            >
            Some awesome integrations
          </li>
        </ul>
      </div>

      <div
        class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"
      >
        <img
          src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
          class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: "un-auth",
});
</script>
