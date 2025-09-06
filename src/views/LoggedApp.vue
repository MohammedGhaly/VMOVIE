<script setup>
  import { provide } from 'vue'
  import { RouterView } from 'vue-router'
  import NavBar from '../components/NavBar.vue'
  import SearchList from '../components/SearchList.vue'
  import { createSearchStore } from '../stores/store'

  const store = createSearchStore()
  provide('searchStore', store)
</script>

<template>
  <div class="m-8 space-y-3">
    <NavBar />
    <SearchList v-if="store.state.isSearching" />
    <RouterView v-else />
  </div>
</template>
