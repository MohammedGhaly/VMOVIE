<script setup>
  import { onMounted, reactive } from 'vue'
  import ProfileMovieItem from './ProfileMovieItem.vue'
  import {
    getUserMovies,
    getUserOverratedMovies,
    getUserUnderratedMovies,
  } from '../services/supabaseServices'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  //   import data from '../data/movies.json'
  import { RouterLink } from 'vue-router'

  const props = defineProps({ userId: { type: String, required: true } })

  //   const state = reactive({
  //     topMovies: data.topMovies,
  //     recentMovies: data.recentMovies,
  //     underratedMovies: data.recentMovies,
  //     overratedMovies: data.recentMovies,
  //     isLoading: false,
  //   })
  const state = reactive({
    topMovies: [],
    recentMovies: [],
    underratedMovies: [],
    overratedMovies: [],
    isLoading: false,
  })

  onMounted(async () => {
    try {
      state.isLoading = true
      const [topmovies, recentmovies, underratedmovies, overratedmovies] =
        await Promise.all([
          getUserMovies(props.userId, 'personalrating', false, 10),
          getUserMovies(props.userId, 'watched_at', false, 10),
          getUserUnderratedMovies(props.userId, 5),
          getUserOverratedMovies(props.userId, 5),
        ])
      state.topMovies = topmovies
      state.recentMovies = recentmovies
      state.underratedMovies = underratedmovies.filter(
        (item) => Math.abs(item.rating_diff) > 3,
      )
      state.overratedMovies = overratedmovies.filter(
        (item) => Math.abs(item.rating_diff) > 3,
      )
    } catch (err) {
      console.log(err)
    } finally {
      state.isLoading = false
    }
  })
</script>

<template>
  <template v-if="!state.isLoading">
    <!-- Top rated -->
    <h2 v-if="state.topMovies.length > 0" class="text-2xl ml-3 font-bold mb-3">
      Top rated
    </h2>
    <div
      v-if="state.topMovies.length > 0"
      class="flex gap-2 mx-3 pb-3 overflow-x-auto"
    >
      <ProfileMovieItem
        v-for="movie in state.topMovies"
        :key="`t${movie.id}`"
        :movie="movie"
      />
    </div>
    <!-- Watched recently -->
    <h2
      v-if="state.recentMovies.length > 0"
      class="text-2xl ml-3 font-bold mb-3"
    >
      Watched recently
    </h2>
    <div
      v-if="state.recentMovies.length > 0"
      class="recent-movies flex gap-2 mx-3 pb-3 overflow-x-auto"
    >
      <ProfileMovieItem
        v-for="movie in state.recentMovies"
        :key="`r${movie.id}`"
        :movie="movie"
      />
    </div>
    <!-- Underrated Movies -->
    <h2
      v-if="state.underratedMovies.length > 0"
      class="text-2xl ml-3 font-bold mb-3"
    >
      Underrated Movies
    </h2>
    <div
      v-if="state.underratedMovies.length > 0"
      class="recent-movies flex gap-2 mx-3 pb-3 overflow-x-auto"
    >
      <ProfileMovieItem
        v-for="movie in state.underratedMovies"
        :key="`r${movie.id}`"
        :movie="movie"
      />
    </div>
    <!-- Overrated Movies -->
    <h2
      v-if="state.overratedMovies.length > 0"
      class="text-2xl ml-3 font-bold mb-3"
    >
      Overrated Movies
    </h2>
    <div
      v-if="state.overratedMovies.length > 0"
      class="recent-movies flex gap-2 mx-3 pb-3 overflow-x-auto"
    >
      <ProfileMovieItem
        v-for="movie in state.overratedMovies"
        :key="`r${movie.id}`"
        :movie="movie"
      />
    </div>
    <div class="w-fit mx-auto">
      <router-link
        class="text-indigo-500 underline text-lg text-center mx-auto"
        :to="`/allMovies/${userId}`"
      >
        View all movies
      </router-link>
    </div>
  </template>
  <div v-else class="w-full flex justify-center items-center h-full">
    <SyncLoader color="white" size="22px" />
  </div>
</template>

<style scoped>
  .overflow-x-auto::-webkit-scrollbar {
    width: 1px; /* Width of the scrollbar */
    height: 4px;
  }

  /* Scrollbar track (background) */
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #3a3a3a; /* Light grey background */
    border-radius: 10px; /* Rounded corners */
  }

  /* Scrollbar thumb (draggable handle) */
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #888; /* Dark grey handle */
    border-radius: 10px; /* Rounded corners */
  }

  /* Scrollbar thumb on hover */
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker grey on hover */
  }
</style>
