import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

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
        console.log('Auth state changed:', {
          user: this.user,
          session: this.session,
        })
      })
    },

    async loginWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: import.meta.env.VITE_SITE_URL,
        },
      })
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})
