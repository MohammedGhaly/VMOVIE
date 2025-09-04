<script setup>
  import { ref } from 'vue'
  import MoviesSearchList from './MoviesSearchList.vue'
  import ProfilesSearchList from './ProfilesSearchList.vue'
  const props = defineProps({
    searchText: {
      type: String,
      default: '',
    },
  })
  const searchMode = ref('movies')
</script>

<template>
  <!-- search mode toggle -->
  <div
    class="flex w-full gap-6 *:w-full *:rounded-lg font-semibold text-xl *:py-2 *:transition-all *:duration-200"
  >
    <button
      :class="{
        'bg-neutral-700': searchMode === 'movies',
        'bg-neutral-800': searchMode !== 'movies',
      }"
      @click="searchMode = 'movies'"
    >
      Movies
    </button>
    <button
      :class="{
        'bg-neutral-700': searchMode === 'profiles',
        'bg-neutral-800': searchMode !== 'profiles',
      }"
      @click="searchMode = 'profiles'"
    >
      Profiles
    </button>
  </div>
  <MoviesSearchList
    v-if="searchMode === 'movies'"
    :search-text="props.searchText"
  />
  <ProfilesSearchList v-else :search-text="props.searchText" />
</template>
