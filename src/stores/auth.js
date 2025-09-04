import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // Load current session
  async function loadUser() {
    const { data } = await supabase.auth.getUser()
    user.value = data?.user ?? null
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })

  return { user, loadUser }
})
