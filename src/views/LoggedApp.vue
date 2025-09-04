<script setup>
  import { RouterView } from 'vue-router'
  import { ref } from 'vue'
  import NavBar from '../components/NavBar.vue'
  import SearchList from '../components/SearchList.vue'

  const isSearching = ref(false)

  const setIsSearching = (value) => {
    isSearching.value = value
  }
  const searchText = ref('')
</script>

<template>
  <div class="m-8 space-y-6">
    <NavBar
      v-model="searchText"
      :is-searching="isSearching"
      :set-is-searching="setIsSearching"
    />
    <SearchList v-if="isSearching" :search-text="searchText" />
    <RouterView v-else />
  </div>
</template>
