<script setup>
  import { ref } from 'vue'
  import GoogleLoginButton from '../components/GoogleLoginButton.vue'
  import router from '../router'
  import { signUp } from '../services/supabaseServices'
  import { useToast } from 'vue-toastification'
  import { RouterLink } from 'vue-router'
  import AuthSubmitButton from '../components/AuthSubmitButton.vue'

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false)
  const toast = useToast()

  async function handleSignup() {
    if (password.value !== confirmPassword.value) {
      toast.error('Passwords do not match')
      return
    }
    try {
      isLoading.value = true
      await signUp(email.value, password.value)
      toast.success(
        'Account created successfully, a confirmation link was sent to your email',
      )
      router.push('/')
    } catch (error) {
      toast.error(error.message)
      return
    }

    // const { error } = await signUp(email.value, password.value)
    // if (error) {
    //   toast.error(error.message)
    // } else {
    //   errorMessage.value = ''
    //   router.push('/')
    // }
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
      <form class="flex flex-col gap-y-4 w-full" @submit.prevent="handleSignup">
        <label for="email" class="text-lg font-medium ml-1">Email</label>
        <input
          v-model="email"
          name="email"
          type="email"
          placeholder="email"
          class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
        />
        <label for="password" class="text-lg font-medium ml-1">Password</label>
        <input
          v-model="password"
          name="password"
          type="password"
          placeholder="password"
          class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
        />
        <label for="confirmPassword" class="text-lg font-medium ml-1">
          confirm password
        </label>
        <input
          v-model="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
          class="bg-neutral-700 p-2 px-3 text-lg rounded-lg"
        />
        <AuthSubmitButton :is-loading="isLoading" text="Sign Up" />
        <GoogleLoginButton />
        <RouterLink to="/login" class="underline text-sm text-center">
          Already have an account? Login
        </RouterLink>
      </form>
    </div>
  </div>
</template>
