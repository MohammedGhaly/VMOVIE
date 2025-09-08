<script setup>
  import { inject } from 'vue'
  import MoviesSearchList from './MoviesSearchList.vue'
  import ProfilesSearchList from './ProfilesSearchList.vue'
  const { state, setSearchMode } = inject('searchStore')
</script>

<template>
  <!-- search mode toggle -->
  <div
    class="flex m-8 w-full gap-3 bg-neutral-900 p-2 rounded-lg xl:w-3/5 xl:mx-auto *:w-full *:rounded-lg font-semibold text-xl *:py-2 *:transition-all *:duration-200 *:hover:brightness-105"
  >
    <button
      :class="{
        'bg-neutral-700': state.searchMode === 'movies',
        'bg-neutral-800': state.searchMode !== 'movies',
      }"
      @click="setSearchMode('movies')"
    >
      Movies
    </button>
    <button
      :class="{
        'bg-neutral-700': state.searchMode === 'profiles',
        'bg-neutral-800': state.searchMode !== 'profiles',
      }"
      @click="setSearchMode('profiles')"
    >
      Profiles
    </button>
  </div>
  <!-- search lists -->
  <MoviesSearchList v-if="state.searchMode === 'movies'" />
  <ProfilesSearchList v-else />
</template>
