<script setup>
  import { useAuthStore } from './stores/auth'
  import LoggedApp from './views/LoggedApp.vue'
  import LoginView from './views/LoginView.vue'

  const auth = useAuthStore()
  auth.initAuth()
</script>

<template>
  <LoggedApp v-if="auth.user" />
  <LoginView v-else />
</template>
