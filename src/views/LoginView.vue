<script setup>
  import { onBeforeMount, ref } from 'vue'
  import { signIn } from '../services/supabaseServices'
  import router from '../router'
  import GoogleLoginButton from '../components/GoogleLoginButton.vue'
  import { RouterLink } from 'vue-router'
  import AuthSubmitButton from '../components/AuthSubmitButton.vue'
  import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)
  const toast = useToast()

  const auth = useAuthStore()
  
  async function handleLogin() {
    try {

      isLoading.value = true
      await signIn(email.value, password.value)
      errorMessage.value = ''
      router.push('/')
    } catch(error){
        errorMessage.value = error.message
        isLoading.value = false
        toast.error(errorMessage.value)
    }
  }

  onBeforeMount(()=>{
    if (auth.user) router.replace('/')
  })
  
</script>

<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center space-y-6"
  >
    <div
      class="bg-neutral-800 flex flex-col py-12 px-8 w-[88vw] md:max-w-[60vw] mx-auto xl:w-[40vw] xl:px-12 rounded-2xl space-y-6 items-center border-2 border-indigo-800"
    >
      <img class="w-24 h-24" src="/logo.png" alt="VMOVIE Logo" />
      <form class="flex flex-col gap-y-4 w-full" @submit.prevent="handleLogin">
        <div class="flex flex-col w-full gap-1">
          <label for="email" class="text-lg font-medium ml-1">Email</label>
          <input
            v-model="email"
            name="email"
            type="email"
            placeholder="Email"
            class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
          />
        </div>
        <div class="flex flex-col w-full gap-1">
          <label for="password" class="text-lg font-medium ml-1">
            Password
          </label>
          <input
            v-model="password"
            name="password"
            type="password"
            placeholder="Password"
            class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
          />
        </div>
        <AuthSubmitButton :is-loading="isLoading" text="Login" />
        <GoogleLoginButton />
        <RouterLink to="/signup" class="underline text-sm text-center">
          Don't have an account? Register
        </RouterLink>
      </form>
    </div>
  </div>
</template>
