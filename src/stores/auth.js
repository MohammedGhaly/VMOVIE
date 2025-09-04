import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import router from '../router'

const redirectUrl = import.meta.env.VITE_REDIRECT_URL
console.log(redirectUrl)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
  }),
  actions: {
    async initAuth() {
      const { data } = await supabase.auth.getSession()
      this.session = data.session
      this.user = data.session?.user ?? null

      // listen for changes
      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session
        this.user = session?.user ?? null
        if (session?.user) router.push('/')
        console.log(session.user)
      })
    },

    async loginWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      })
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      router.push('/login')
    },
  },
})
