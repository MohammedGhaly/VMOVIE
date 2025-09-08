<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { omdbFetchMovieById } from '../services/omdbAPI'

  const movie = ref({})
  const route = useRoute()
  const { imdbid } = route.params

  onMounted(async () => {
    const fetchedMovie = await omdbFetchMovieById(imdbid)
    movie.value = fetchedMovie
  })
</script>

<template>
  <div class="w-full h-full">{{ movie.Title }}</div>
</template>
