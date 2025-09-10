<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { omdbFetchMovieById } from '../services/omdbAPI'
  import imdbLogo from '/imdbLogo.svg'
  import metacriticLogo from '/metacriticLogo.svg'
  import rottentomatoesLogo from '/rottentomatoesLogo.svg'
  import Plot from '../components/Plot.vue'
  import MovieViewRating from '../components/MovieViewRating.vue'
  import { getUserMovieByImdbId } from '../services/supabaseServices'
  import { useAuthStore } from '../stores/auth'
  import { useToast } from 'vue-toastification'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  const movie = ref({})
  const isLoading = ref(false)

  const route = useRoute()
  const auth = useAuthStore()
  const toast = useToast()

  const { imdbid } = route.params

  onMounted(async () => {
    try {
      isLoading.value = true
      let fetchedMovie = await getUserMovieByImdbId(auth.user.id, imdbid)
      if (!fetchedMovie) {
        fetchedMovie = await omdbFetchMovieById(imdbid)
      }
      movie.value = fetchedMovie
    } catch {
      toast.error("coulnd't fetch this movie, try again later")
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <div
    class="w-full h-full flex flex-col lg:flex-row gap-8 pb-10 min-h-[70vh]"
    :class="{ 'justify-center': isLoading }"
  >
    <sync-loader v-if="isLoading" size="24px" color="white" class="mx-auto" />
    <template v-else>
      <div class="flex flex-col items-center gap-3">
        <img
          class="w-60 rounded-xl"
          :src="movie.posterurl"
          :alt="`{{ movie.title }}_poster`"
        />
        <h2 class="font-semibold text-4xl text-center text-white">
          {{ movie.title }}
        </h2>
      </div>
      <div class="px-8 space-y-4">
        <!-- info -->
        <div
          class="flex justify-start gap-4 *:font-semibold *:bg-neutral-800 *:rounded-lg *:p-2"
        >
          <span class="text-2xl">{{ movie.year }}</span>
          <span class="text-xl">{{ movie.country }}</span>
        </div>
        <!-- plot -->
        <Plot :plot="movie.plot" />
        <!-- ratings -->
        <div
          class="ratings flex justify-start gap-4 *:font-semibold *:items-center *:text-lg"
        >
          <div
            v-if="movie.imdbrating"
            class="p-2 flex items-center gap-3 bg-neutral-800 rounded-lg"
          >
            <img class="w-8 h-8" :src="imdbLogo" alt="imdb" />
            {{ movie.imdbrating }}
          </div>
          <div
            v-if="movie.rottentomatoesrating"
            class="p-2 flex items-center gap-3 bg-neutral-800 rounded-lg"
          >
            <img
              :src="rottentomatoesLogo"
              alt="rotten tomatoes"
              class="w-8 h-8"
            />
            {{ movie.rottentomatoesrating }}
          </div>
          <div
            v-if="movie.metacriticrating"
            class="p-2 flex items-center gap-3 bg-neutral-800 rounded-lg"
          >
            <img class="w-8 h-8" :src="metacriticLogo" alt="imdb" />
            {{ movie.metacriticrating }}
          </div>
        </div>
        <div class="flex w-full justify-center mt-10">
          <MovieViewRating
            :imdb-id="movie.imdbid"
            :initial-rate="movie.personalrating"
            :initial-review="movie.review"
          />
        </div>
      </div>
    </template>
  </div>
</template>
