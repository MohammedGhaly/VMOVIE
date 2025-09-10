<script setup>
  import { Star } from 'lucide-vue-next'
  import { ref } from 'vue'
  import Rating from './Rating.vue'
  import router from '../router'

  const props = defineProps({
    movie: { type: Object, required: true },
  })
  const beingRated = ref(false)
</script>

<template>
  <div
    class="searched-movie-card flex justify-between h-32 xl:h-52 p-2 bg-neutral-900 rounded-2xl gap-6 hover:brightness-105"
    @click="router.push(`/movie/${props.movie.imdbID}`)"
  >
    <img
      :src="props.movie.Poster"
      :alt="`${props.movie.Title}`"
      class="rounded-lg h-full xl:w-34"
    />
    <div class="flex-1 flex flex-col h-full justify-between py-2">
      <div class="flex flex-col">
        <h3 class="text-lg xl:text-2xl font-semibold">
          {{ props.movie.Title }}
        </h3>
        <p class="text-sm text-gray-400">Year: {{ props.movie.Year }}</p>
      </div>
      <div class="flex gap-2 *:font-semibold *:xl:text-xl xl:gap-4">
        <button
          v-if="!beingRated"
          class="bg-indigo-500 text-white py-2 px-4 rounded-lg w-fit text-lg hover:brightness-95 flex justify-center gap-2"
          @click="beingRated = true"
        >
          <Star stroke-width="3px" color="white" />
          Rate
        </button>
        <Rating v-else :imdb-id="movie.imdbID" />
      </div>
    </div>
  </div>
</template>
