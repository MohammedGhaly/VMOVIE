<script setup>
  import { onMounted, reactive, ref } from 'vue'
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
  import ProfileTabs from '../components/ProfileTabs.vue'
  import { useAuthStore } from '../stores/auth'
  import { useToast } from 'vue-toastification'
  import ProfileAllMovies from '../components/ProfileAllMovies.vue'

  const state = reactive({
    isLoading: false,
    profile: {},
    following: false,
  })

  const activeTab = ref('movies')

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
  <div
    v-if="!state.isLoading"
    class="profile-view flex flex-col justify-start gap-8"
  >
    <ProfileHeader v-if="state.profile" :profile="state.profile">
      <template #follow>
        <button
          v-if="!state.following"
          class="bg-indigo-800/40 p-2 rounded-lg font-semibold"
          @click="handleFollow"
        >
          Follow
        </button>
        <button
          v-else
          class="bg-neutral-800 p-2 rounded-lg font-semibold"
          @click="handleUnfollow"
        >
          Unfollow
        </button>
      </template>
    </ProfileHeader>
    <div
      class="flex flex-col justify-start gap-4 bg-neutral-900 rounded-2xl pb-3 flex-1"
    >
      <profile-tabs
        :active-tab="activeTab"
        :is-my-profile="false"
        @set-profile-tab="(val) => (activeTab = val)"
      />
      <ProfileMovies v-if="activeTab === 'movies'" :user-id="profileId" />
      <ProfileAllMovies
        v-else-if="activeTab === 'all'"
        :user-id="profileId"
        :movies-count="state.profile.moviesCount"
      />
    </div>
  </div>
  <div v-else class="h-[45vh] md:h-[60vh] flex items-center justify-center">
    <SyncLoader color="white" size="22px" />
  </div>
</template>
