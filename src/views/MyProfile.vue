<script setup>
  import { inject, ref } from 'vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
  import ProfileAllMovies from '../components/ProfileAllMovies.vue'
  import ProfileHeader from '../components/ProfileHeader.vue'
  import ProfileMovies from '../components/ProfileMovies.vue'
  import ProfileTabs from '../components/ProfileTabs.vue'
  import UpdateProfilePictureModal from '../components/UpdateProfilePictureModal.vue'
  import { useAuthStore } from '../stores/auth'
  import LogoutButton from '../components/LogoutButton.vue'

  const activeTab = ref('movies')
  const isPicModalOpen = ref(false)
  const { profile, isLoading, error } = inject('profileStore')
  const auth = useAuthStore()

  const closePicModal = () => (isPicModalOpen.value = false)
  const openPicModal = () => (isPicModalOpen.value = true)
</script>

<template>
  <div v-if="!isLoading && !error" class="flex flex-col justify-start gap-8">
    <ProfileHeader :profile="profile" @open-pic-modal="openPicModal">
      <template #logout>
        <LogoutButton />
      </template>
    </ProfileHeader>
    <div
      class="flex flex-col justify-start gap-4 bg-neutral-900 rounded-2xl pb-3 flex-1"
    >
      <profile-tabs
        :active-tab="activeTab"
        @set-profile-tab="(val) => (activeTab = val)"
      />
      <ProfileMovies
        v-if="activeTab === 'movies'"
        :user-id="auth.user.id"
        @view-all="activeTab = 'all'"
      />
      <ProfileAllMovies
        v-else-if="activeTab === 'all'"
        :user-id="auth.user.id"
        :movies-count="profile.moviesCount"
      />
    </div>
    <UpdateProfilePictureModal
      v-if="isPicModalOpen"
      @close-pic-modal="closePicModal"
    />
  </div>
  <div v-else class="h-[45vh] md:h-[60vh] flex items-center justify-center">
    <p v-if="error" class="text-xl md:text-2xl font-semibold text-center px-10">
      {{ error }}
    </p>
    <SyncLoader v-else color="white" size="22px" />
  </div>
</template>
