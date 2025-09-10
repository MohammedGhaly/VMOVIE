<script setup>
  import { inject, ref } from 'vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
  import ProfileHeader from '../components/ProfileHeader.vue'
  import { useAuthStore } from '../stores/auth'
  import ProfileTabs from '../components/ProfileTabs.vue'
  import ProfileMovies from '../components/ProfileMovies.vue'
  import ProfileSettings from '../components/ProfileSettings.vue'
  import ProfileAllMovies from '../components/ProfileAllMovies.vue'

  const activeTab = ref('movies')
  const { profile, isLoading } = inject('profileStore')
  const auth = useAuthStore()
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col justify-start gap-8">
    <ProfileHeader :profile="profile" />
    <div
      class="flex flex-col justify-start gap-4 bg-neutral-900 rounded-lg pb-3 flex-1"
    >
      <profile-tabs
        :active-tab="activeTab"
        @set-profile-tab="(val) => (activeTab = val)"
      />
      <ProfileMovies v-if="activeTab === 'movies'" :user-id="auth.user.id" />
      <ProfileAllMovies
        v-else-if="activeTab === 'all'"
        :user-id="auth.user.id"
      />
      <ProfileSettings v-else-if="activeTab === 'settings'" />
    </div>
  </div>
  <div v-else class="h-[70vh] flex items-center justify-center">
    <SyncLoader color="white" size="22px" />
  </div>
</template>
