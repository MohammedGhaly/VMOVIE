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
  const error = ref('')

  const auth = useAuthStore()
  const toast = useToast()

  onMounted(async () => {
    try {
      isLoading.value = true
      const [fetchedFollowingReviews, fetchedNewReleases] = await Promise.all([
        getFriendsRecentReviews(auth.user.id),
        getNewReleases(),
      ])
      newReleases.value = fetchedNewReleases
      followingReviews.value = fetchedFollowingReviews
    } catch (err) {
      toast.error('an unexpected error has occured')
      error.value = 'an unexpected error has occured, try again later'
      console.log(err.message)
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <div
    v-if="!isLoading && !error"
    class="feed mx-2 md:mx-5 space-y-4 md:flex md:flex-row-reverse md:gap-5"
  >
    <div class="md:overflow-y-auto md:overflow-x-hidden no-scroll-bar md:mb-0">
      <h1 class="mx-2 font-bold text-2xl text-white mb-2 lg:text-3xl lg:mb-4">
        New Releases
      </h1>
      <div
        class="newReleases flex gap-2 w-full overflow-x-auto p-2 rounded-lg md:flex-col md:w-[28vw] md:p-0"
      >
        <MovieCard
          v-for="item in newReleases"
          :key="item.imdbid"
          :movie="item"
        />
      </div>
    </div>
    <div class="md:flex-1 md:overflow-y-auto no-scroll-bar">
      <h1 class="mx-2 font-bold text-2xl lg:text-3xl text-white mb-2 lg:mb-4">
        Feed
      </h1>
      <div
        v-if="followingReviews && followingReviews.length"
        class="flex flex-col gap-2 lg:gap-3"
      >
        <FeedCard
          v-for="item in followingReviews"
          :key="item.id"
          :review="item"
        />
      </div>
      <div v-else class="h-[30vh] md:h-[70vh] flex items-center justify-center">
        <p class="p-10 text-center font-semibold text-2xl">
          your reviews feed is currently empty
        </p>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-[70vh] flex items-center justify-center">
    <p v-if="error" class="text-xl md:text-2xl font-semibold text-center px-10">
      {{ error }}
    </p>
    <SyncLoader v-else size="28px" color="white" />
  </div>
</template>

<style scoped>
  .no-scroll-bar::-webkit-scrollbar {
    width: 3px; /* Width of the scrollbar */
    height: 4px;
  }

  /* Scrollbar track (background) */
  .no-scroll-bar::-webkit-scrollbar-track {
    background: #3a3a3a; /* Light grey background */
    border-radius: 10px; /* Rounded corners */
  }

  /* Scrollbar thumb (draggable handle) */
  .no-scroll-bar::-webkit-scrollbar-thumb {
    background: #888; /* Dark grey handle */
    border-radius: 10px; /* Rounded corners */
  }

  /* Scrollbar thumb on hover */
  .no-scroll-bar::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker grey on hover */
  }
</style>
