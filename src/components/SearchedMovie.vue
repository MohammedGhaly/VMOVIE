<script setup>
  const props = defineProps({
    movie: { type: Object, required: true },
  })
</script>

<template>
  <div
    class="searched-movie-card flex justify-between h-32 xl:h-52 border-y gap-6"
  >
    <img
      :src="props.movie.Poster"
      :alt="`${props.movie.Title}`"
      class="rounded-lg h-full"
    />
    <div class="flex-1 flex flex-col h-full justify-between py-2">
      <div class="flex flex-col">
        <h3 class="text-lg xl:text-2xl font-semibold">
          {{ props.movie.Title }}
        </h3>
        <p class="text-sm text-gray-400">Year: {{ props.movie.Year }}</p>
      </div>
      <div class="flex gap-2 *:font-semibold *:xl:text-xl xl:gap-4">
        <button class="bg-indigo-500 text-white py-1 px-2 rounded-lg w-fit">
          Add your rating
        </button>
        <button class="bg-gray-600 text-white py-1 px-2 rounded-lg w-fit">
          Watchlater
        </button>
      </div>
    </div>
  </div>
</template>
