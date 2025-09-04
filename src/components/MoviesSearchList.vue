<script setup>
  import { ref, watch } from 'vue'
  // import movies from '../data/movies.json'
  import SearchedMovie from './SearchedMovie.vue'
  import { fetchMovies } from '../services/omdbAPI'

  const props = defineProps({
    searchText: { type: String, default: '' },
  })

  const moviesList = ref([])
  const isLoading = ref(false)
  const error = ref('')
  console.log(moviesList.value)

  watch(
    () => props.searchText,
    async (newVal, _oldVal, onCleanup) => {
      const controller = new AbortController()
      try {
        error.value = ''
        if (newVal.length > 1) {
          isLoading.value = true
          const timeoutId = setTimeout(() => {
            fetchMovies(newVal, controller)
              .then((res) => {
                moviesList.value = res
              })
              .finally(() => {
                isLoading.value = false
              })
              .catch((err) => {
                if (err.name !== 'AbortError') {
                  console.error(err)
                }
                error.value = err.message
              })
          }, 500)

          // Cleanup when watcher re-runs or component unmounts
          onCleanup(() => {
            clearTimeout(timeoutId)
            controller.abort()
          })
        } else {
          isLoading.value = false
        }
      } catch (err) {
        error.value = err.message
      }
    },
  )
</script>

<template>
  <p v-if="error" class="text-4xl w-full text-center font-semibold">
    {{ error }} 🚫
  </p>
  <div class="movies-list flex flex-col gap-2 xl:mx-32">
    <SearchedMovie
      v-for="movie in moviesList"
      :key="movie.imdb_id"
      :movie="movie"
    />
  </div>
</template>
