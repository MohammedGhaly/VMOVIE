import { ref } from 'vue'
import { getProfile } from '../services/supabaseServices'

export const createProfileStore = () => {
  const profile = ref({})
  const isLoading = ref(false)

  const fetchProfile = async (id) => {
    isLoading.value = true
    try {
      const data = await getProfile(id)
      profile.value = data
    } catch (err) {
      console.log(err.message)
    } finally {
      isLoading.value = false
    }
  }

  return { profile, fetchProfile, isLoading }
}
