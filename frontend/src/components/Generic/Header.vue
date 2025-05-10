<script setup lang="ts">
import Logo from './Logo.vue';
import LoginButton from '../Buttons/LoginButton.vue';
</script>

<template>
  <header class="py-3 border-b border-gray-200">
    <div class="flex justify-between items-center mx-auto max-w-6xl">
      <div><Logo /></div>
      <div><LoginButton /></div>
    </div>
  </header>
</template>
