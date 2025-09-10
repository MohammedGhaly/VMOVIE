<script setup>
  import { onMounted, ref } from 'vue'
  import ProfileMovieItem from './ProfileMovieItem.vue'
  import { getUserMovies } from '../services/supabaseServices'
  import { useToast } from 'vue-toastification'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  const props = defineProps({ userId: { type: String, required: true } })
  const movies = ref([])
  const isLoading = ref(false)
  const pageNumber = ref(1)

  const toast = useToast()

  const fetchNextMoviesPage = async () => {
    isLoading.value = true
    try {
      const fetchedMovies = await getUserMovies(
        props.userId,
        'watched_at',
        false,
        10,
        pageNumber.value,
      )
      movies.value = [...movies.value, ...fetchedMovies]
      pageNumber.value = pageNumber.value + 1
    } catch {
      toast.error("couldn't fetch movies, try again later")
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchNextMoviesPage)
</script>

<template>
  <div
    class="px-3 grid grid-cols-1 xl:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4 justify-items-center w-full"
  >
    <ProfileMovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
  <div v-if="isLoading" class="w-full flex justify-center p-6">
    <SyncLoader color="#fff" size="10px" />
  </div>
  <p
    class="w-full underline cursor-pointer text-indigo-400 text-lg text-center"
    @click="fetchNextMoviesPage"
  >
    Load more
  </p>
</template>
