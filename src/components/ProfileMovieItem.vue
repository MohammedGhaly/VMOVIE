<script setup>
  import { Star } from 'lucide-vue-next'
  import router from '../router'

  const props = defineProps({ movie: { type: Object, required: true } })
</script>

<template>
  <div
    class="relative flex-shrink-0 w-[180px] md:w-[230px]"
    @click="router.push(`/movie/${props.movie.imdbid}`)"
  >
    <div class="absolute top-1 left-1 z-10">
      <Star fill="#312c85" class="w-10 h-10 md:w-14 md:h-14" />
      <span
        class="absolute font-bold top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] md:text-lg"
      >
        {{ props.movie.personalrating }}
      </span>
    </div>
    <div
      class="flex flex-col h-full items-center p-2 gap-2 rounded-xl bg-neutral-800 pr-3"
    >
      <div class="flex items-start gap-3">
        <img
          :src="props.movie.posterurl || props.movie.posterurl"
          :alt="`${props.movie.Title}`"
          class="rounded-lg h-full w-24 md:w-28 xl:w-34"
        />
        <p
          v-if="props.movie.review"
          class="review bg-neutral-700 text-gray-200 p-2 mt-3 rounded-lg pr-3 max-w-44"
        >
          {{ props.movie.review }}
        </p>
      </div>
      <h1 class="text-white text-xl text-center font-bold">
        {{ props.movie.title }}
      </h1>
    </div>
  </div>
</template>
