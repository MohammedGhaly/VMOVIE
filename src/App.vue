<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth'
  import LoggedApp from './views/LoggedApp.vue'

  const auth = useAuthStore()
</script>

<template>
  <LoggedApp v-if="auth.user" />
  <RouterView v-else />
</template>
