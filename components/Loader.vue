<template>
  <span class="loader"></span>
</template>

<script setup></script>

<style>
.loader {
  border: 2px solid transparent;
  border-top-color: white;
  border-right-color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin: 6px 0;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
