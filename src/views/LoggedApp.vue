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
  <div class="space-y-3 pb-4 flex flex-col h-screen">
    <NavBar class="shrink-0" />
    <SearchList
      v-if="searchStore.state.isSearching"
      class="flex-1 overflow-auto"
    />
    <RouterView
      v-else
      class="flex-1 router-view overflow-y-auto xl:w-4/5 xl:mx-auto"
    />
  </div>
</template>

<style scoped>
  .router-view::-webkit-scrollbar {
    width: 0px;
  }
</style>
