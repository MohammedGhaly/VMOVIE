<script setup>
  import { inject, ref, watch } from 'vue'
  import SearchedMovie from './SearchedMovie.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
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
  <div
    v-if="isLoading || error"
    class="flex items-center justify-center min-h-[60vh]"
  >
    <SyncLoader v-if="isLoading" size="22px" color="#fff" />
    <p v-else-if="error" class="text-4xl w-full text-center font-semibold">
      {{ error }} 🚫
    </p>
  </div>
  <div
    v-else
    class="movies-list flex flex-col gap-2 xl:mx-32 md:grid md:grid-cols-2 pb-4 px-3"
  >
    <SearchedMovie
      v-for="movie in moviesList"
      :key="movie.imdbID"
      :movie="movie"
    />
  </div>
</template>
