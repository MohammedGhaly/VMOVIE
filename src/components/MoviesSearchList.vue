<script setup>
  import { inject, ref, watch } from 'vue'
  import SearchedMovie from './SearchedMovie.vue'
  import { omdbFetchMoviesByName } from '../services/omdbAPI'

  const moviesList = ref([])
  const isLoading = ref(false)
  const error = ref('')
  const { state } = inject('searchStore')

  watch(
    () => state.searchText,
    async (newVal, _oldVal, onCleanup) => {
      const controller = new AbortController()
      try {
        error.value = ''
        if (newVal.length > 1) {
          isLoading.value = true
          const timeoutId = setTimeout(() => {
            omdbFetchMoviesByName(newVal, controller)
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
  <div class="movies-list flex flex-col gap-2 xl:mx-32 xl:grid xl:grid-cols-2">
    <SearchedMovie
      v-for="movie in moviesList"
      :key="movie.imdbID"
      :movie="movie"
    />
  </div>
</template>
