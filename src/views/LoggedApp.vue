<script setup>
  import { provide } from 'vue'
  import { RouterView } from 'vue-router'
  import NavBar from '../components/NavBar.vue'
  import SearchList from '../components/SearchList.vue'
  import { createSearchStore } from '../stores/searchStore'
  import { createProfileStore } from '../stores/profile'
  import { useAuthStore } from '../stores/auth'

  const searchStore = createSearchStore()
  const profileStore = createProfileStore()
  const auth = useAuthStore()

  provide('searchStore', searchStore)
  provide('profileStore', profileStore)
  profileStore.fetchProfile(auth.user.id)
</script>

<template>
  <div class="space-y-3">
    <NavBar />
    <SearchList v-if="searchStore.state.isSearching" />
    <RouterView v-else />
  </div>
</template>
