<script setup>
  import { onMounted, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import {
    followUser,
    getProfile,
    isFollowing,
    unfollowUser,
  } from '../services/supabaseServices'
  import ProfileMovies from '../components/ProfileMovies.vue'
  import ProfileHeader from '../components/ProfileHeader.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
  import { useAuthStore } from '../stores/auth'
  import { useToast } from 'vue-toastification'

  const state = reactive({
    isLoading: false,
    profile: {},
    following: false,
  })

  const route = useRoute()
  const auth = useAuthStore()
  const { id: profileId } = route.params

  const toast = useToast()

  function handleFollow() {
    followUser(auth.user.id, profileId)
      .then(() => {
        state.following = true
      })
      .catch(() => {
        toast.error('failed to follow this profile')
        state.following = false
      })
  }
  function handleUnfollow() {
    unfollowUser(auth.user.id, profileId)
      .then(() => {
        state.following = false
      })
      .catch(() => {
        toast.error('failed to unfollow this profile')
        state.following = true
      })
  }

  onMounted(async () => {
    try {
      state.isLoading = true
      const [profile, following] = await Promise.all([
        getProfile(profileId),
        isFollowing(auth.user.id, profileId),
      ])
      state.profile = profile
      state.following = following
    } catch (error) {
      console.error('Error fetching this profile:', error)
    } finally {
      state.isLoading = false
    }
  })
</script>

<template>
  <div v-if="!state.isLoading" class="flex flex-col justify-start gap-8">
    <ProfileHeader v-if="state.profile" :profile="state.profile">
      <button
        v-if="!state.following"
        class="bg-indigo-700 p-2 rounded-lg font-semibold"
        @click="handleFollow"
      >
        Follow
      </button>
      <button
        v-else
        class="bg-indigo-700 p-2 rounded-lg font-semibold"
        @click="handleUnfollow"
      >
        Unfollow
      </button>
    </ProfileHeader>
    <div class="bg-neutral-900 rounded-lg pb-3">
      <ProfileMovies :user-id="profileId" />
    </div>
  </div>
  <div v-else class="h-[70vh] flex items-center justify-center">
    <SyncLoader color="white" size="22px" />
  </div>
</template>
