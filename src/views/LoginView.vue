<script setup>
  import { ref } from 'vue'
  import { signIn } from '../services/supabaseServices'
  import router from '../router'

  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')

  async function handleLogin() {
    const { error } = await signIn(email.value, password.value)
    if (error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = ''
      // Handle successful login (e.g., redirect user)
      // For example, you might use Vue Router to navigate to a different page
      router.push('/')
    }
  }
</script>

<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center space-y-6"
  >
    <div
      class="bg-neutral-800 flex flex-col py-12 px-8 w-[88vw] mx-20 rounded-2xl space-y-16 items-center border-2 border-indigo-800"
    >
      <h2 class="text-5xl italic font-extrabold">VMOVIE</h2>
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
        <button
          class="bg-indigo-800 p-2 mt-4 font-semibold rounded-lg text-lg"
          @click="handleLogin"
        >
          Login
        </button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
