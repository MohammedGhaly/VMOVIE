<script setup>
  import router from '../router'

  const props = defineProps({ movie: { type: Object, required: true } })
</script>

<template>
  <div
    class="relative flex-shrink-0 min-w-[200px] max-w-[300px]"
    @click="router.push(`/movie/${props.movie.imdbid}`)"
  >
    <div
      class="flex flex-col h-full items-center p-2 gap-2 rounded-xl bg-neutral-800 pr-3"
    >
      <img
        :src="props.movie.posterurl || props.movie.posterurl"
        :alt="`${props.movie.Title}`"
        class="rounded-lg max-h-52 w-auto xl:w-34"
      />
      <h1
        class="text-white text-center font-bold flex-1 flex items-center"
        :class="{
          'text-lg': props.movie.title.length <= 22,
          'text-base':
            props.movie.title.length > 22 && props.movie.title.length <= 30,
          'text-sm': props.movie.title.length > 30,
        }"
      >
        {{ props.movie.title }}
      </h1>
    </div>
  </div>
</template>
