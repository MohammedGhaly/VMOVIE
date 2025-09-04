<script setup>
  import { useAuthStore } from '../stores/auth'
  const auth = useAuthStore()
</script>

<template>
  <div>My Profile</div>
  <button class="bg-indigo-800" @click="auth.logout">logout</button>
</template>
