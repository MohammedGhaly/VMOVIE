<script setup>
  import { onBeforeMount } from 'vue'
  import { useAuthStore } from './stores/auth'
  import LoggedApp from './views/LoggedApp.vue'
  import LoginView from './views/LoginView.vue'

  const auth = useAuthStore()

  onBeforeMount(async () => {
    await auth.loadUser()
  })
</script>

<template>
  <LoggedApp v-if="auth.user" />
  <LoginView v-else />
</template>
