<script setup>
  import { ref } from 'vue'
  //   import { signInWithGoogle } from '../services/supabaseServices'
  import { useAuthStore } from '../stores/auth'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  const isLoading = ref(false)
  const auth = useAuthStore()

  const handleSignInWithGoogle = async () => {
    isLoading.value = true
    await auth.loginWithGoogle()
  }
</script>

<template>
  <button
    class="btn bg-neutral-200 p-2 font-semibold justify-center text-gray-950 flex gap-4 items-center hover:bg-neutral-300 text-lg rounded-lg xl:w-4/5 xl:mx-auto"
    @click.prevent="handleSignInWithGoogle"
  >
    <img
      v-if="!isLoading"
      src="/googleLogo.svg"
      alt="Google logo"
      class="mr-2 h-7 w-7"
    />
    <SyncLoader v-else color="#121212" size="10px" />
    continue with Google
  </button>
</template>
