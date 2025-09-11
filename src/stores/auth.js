import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import router from '../router'

const redirectUrl = import.meta.env.VITE_REDIRECT_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    isInitialized: false,
  }),
  actions: {
    async initAuth() {
      if (this.isInitialized) return

      if (window.location.pathname === '/auth/callback') {
        await this.handleOAuthCallback()
        this.isInitialized = true
        return
      }

      const { data } = await supabase.auth.getSession()
      this.session = data.session
      this.user = data.session?.user ?? null

      // listen for changes
      supabase.auth.onAuthStateChange((event, session) => {
        this.session = session
        this.user = session?.user ?? null
        if (event === 'SIGNED_IN') router.push('/')
      })
      this.isInitialized = true
    },

    async handleOAuthCallback() {
      try {
        const { data, error } = await supabase.auth.getSession({
          storeSession: true,
        })

        if (error) {
          console.error('OAuth callback error:', error)
          router.push('/login?error=oauth_failed')
          return
        }

        if (data.session) {
          this.session = data.session
          this.user = data.session.user
          router.push('/')
        }
      } catch (error) {
        console.error('Unexpected error in OAuth callback:', error)
        router.push('/login?error=unexpected')
      }
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
