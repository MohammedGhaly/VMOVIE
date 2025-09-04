<!-- AuthCallback.vue -->
<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../services/supabase'

  const router = useRouter()

  onMounted(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('Error in callback:', error)
        router.push('/login?error=auth_failed')
        return
      }

      if (session) {
        // Successful login
        router.push('/')
      } else {
        // No session found
        router.push('/login?error=no_session')
      }
    } catch (error) {
      console.error('Unexpected error in callback:', error)
      router.push('/login?error=unexpected')
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
