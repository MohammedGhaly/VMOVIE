<script setup>
  import { useAuthStore } from '../stores/auth'

  const auth = useAuthStore()
</script>

<template>
  <button
    class="bg-indigo-800/40 p-2 rounded-lg font-semibold ml-auto"
    @click="auth.logout"
  >
    Logout
  </button>
</template>
