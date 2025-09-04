<!-- AuthCallback.vue -->
<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'

  const router = useRouter()
  const auth = useAuthStore()

  onMounted(async () => {
    try {
      // Let the auth store handle the callback
      await auth.handleOAuthCallback()
    } catch (error) {
      console.error('Callback error:', error)
      router.push('/login?error=callback_failed')
    }
  })
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Completing login...</p>
    </div>
  </div>
</template>
