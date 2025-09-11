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
  import { Star } from 'lucide-vue-next'

  const movie = ref({})
  const isLoading = ref(false)

  const route = useRoute()
  const auth = useAuthStore()
  const toast = useToast()

  const { imdbid } = route.params

  onMounted(async () => {
    try {
      isLoading.value = true
      console.log(auth.user.id)
      let fetchedMovie = await getUserMovieByImdbId(auth.user.id, imdbid)
      if (!fetchedMovie) {
        fetchedMovie = await omdbFetchMovieById(imdbid)
      }
      movie.value = fetchedMovie
    } catch (err) {
      console.log(err.message)
      toast.error("coulnd't fetch this movie, try again later")
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <div
    class="movie-view w-full h-full flex flex-col lg:flex-row gap-8 pb-10 min-h-[70vh]"
    :class="{ 'justify-center items-center': isLoading }"
  >
    <sync-loader v-if="isLoading" size="24px" color="white" class="mx-auto" />
    <template v-else>
      <div class="flex flex-col items-center gap-3 xl:w-[45%]">
        <div class="relative">
          <div v-if="movie.personalrating" class="absolute top-1 left-1 z-10">
            <Star fill="#312c85" class="size-16 md:size-18" color="#312c85" />
            <span
              class="absolute font-bold top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-2xl"
            >
              {{ movie.personalrating }}
            </span>
          </div>
          <img
            class="w-60 rounded-xl xl:w-72"
            :src="movie.posterurl"
            :alt="`{{ movie.title }}_poster`"
          />
        </div>
        <h2 class="font-semibold text-4xl text-center text-white">
          {{ movie.title }}
        </h2>
      </div>
      <div class="px-8 space-y-4">
        <!-- info -->
        <div
          class="flex justify-start gap-4 *:font-semibold *:bg-neutral-800 *:rounded-lg *:p-2"
        >
          <span class="text-2xl flex items-center">{{ movie.year }}</span>
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
            :imdb-id="imdbid"
            :initial-rate="movie.personalrating"
            :initial-review="movie.review"
            @set-personalrating="
              (val) => {
                console.log('value from Movie view', val)
                movie.personalrating = val
              }
            "
          />
        </div>
      </div>
    </template>
  </div>
</template>
