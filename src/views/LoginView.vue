<script setup>
  import { ref } from 'vue'
  import { signIn } from '../services/supabaseServices'
  import router from '../router'
  import GoogleLoginButton from '../components/GoogleLoginButton.vue'
  import { RouterLink } from 'vue-router'
  import AuthSubmitButton from '../components/AuthSubmitButton.vue'

  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)

  async function handleLogin() {
    isLoading.value = true
    const { error } = await signIn(email.value, password.value)
    if (error) {
      errorMessage.value = error.message
      console.log(error)
    } else {
      errorMessage.value = ''
      router.push('/')
    }
  }
</script>

<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center space-y-6"
  >
    <div
      class="bg-neutral-800 flex flex-col py-12 px-8 w-[88vw] mx-20 xl:w-[40vw] xl:px-12 rounded-2xl space-y-6 items-center border-2 border-indigo-800"
    >
      <img class="w-24 h-24" src="/logo.png" alt="VMOVIE Logo" />
      <form class="flex flex-col gap-y-4 w-full" @submit.prevent="handleLogin">
        <label for="email" class="text-lg font-medium ml-1">Email</label>
        <input
          v-model="email"
          name="email"
          type="email"
          placeholder="Email"
          class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
        />
        <label for="password" class="text-lg font-medium ml-1">Password</label>
        <input
          v-model="password"
          name="password"
          type="password"
          placeholder="Password"
          class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
        />
        <AuthSubmitButton :is-loading="isLoading" text="Login" />
        <GoogleLoginButton />
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <RouterLink to="/signup" class="underline text-sm text-center">
          Don't have an account? Register
        </RouterLink>
      </form>
    </div>
  </div>
</template>
