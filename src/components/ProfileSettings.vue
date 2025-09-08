<script setup>
  import { useAuthStore } from '../stores/auth'

  const auth = useAuthStore()
</script>

<template>
  <button class="bg-indigo-800" @click="auth.logout">logout</button>
</template>
