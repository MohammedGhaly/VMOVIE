<script setup>
  import { onMounted, ref } from 'vue'
  import {
    getFriendsRecentReviews,
    getNewReleases,
  } from '../services/supabaseServices'
  import { useAuthStore } from '../stores/auth'
  import { useToast } from 'vue-toastification'
  import MovieCard from '../components/MovieCard.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
  import FeedCard from '../components/FeedCard.vue'

  const followingReviews = ref([])
  const newReleases = ref([])
  const isLoading = ref(false)

  const auth = useAuthStore()
  const toast = useToast()

  onMounted(async () => {
    try {
      isLoading.value = true
      const [fetchedFollowingReviews, fetchedNewReleases] = await Promise.all([
        getFriendsRecentReviews(auth.user.id),
        getNewReleases(),
      ])
      followingReviews.value = fetchedFollowingReviews
      newReleases.value = fetchedNewReleases
    } catch (err) {
      toast.error('an unexpected error has occured')
      console.log(err.message)
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <div v-if="!isLoading" class="feed mx-2 space-y-4">
    <div>
      <h1 class="mx-2 font-bold text-2xl text-white">New Releases</h1>
      <div class="newReleases flex gap-2 w-full overflow-x-auto p-2 rounded-lg">
        <MovieCard
          v-for="item in newReleases"
          :key="item.imdbid"
          :movie="item"
        />
      </div>
    </div>
    <div>
      <h1 class="mx-2 font-bold text-2xl text-white">Feed</h1>
      <div class="flex flex-col gap-2">
        <FeedCard
          v-for="item in followingReviews"
          :key="item.id"
          :review="item"
        />
      </div>
    </div>
  </div>
  <div v-else class="w-full h-[70vh] flex items-center">
    <SyncLoader size="28px" class="text-white" />
  </div>
</template>
