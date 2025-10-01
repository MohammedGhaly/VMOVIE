<script setup>
  import { Home, Search, User, X } from 'lucide-vue-next'
  import Logo from './Logo.vue'
  import { inject, ref } from 'vue'
  import router from '../router'
  import { useAuthStore } from '../stores/auth'

  const auth = useAuthStore()
  const { profile } = inject('profileStore')
  const { state, setIsSearching, setProfiles } = inject('searchStore')
  const searchInputRef = ref(null)
</script>

<template>
  <div
    class="m-8 mt-4 md:mt-8 flex bg-indigo-800 rounded-2xl px-4 justify-between items-center min-h-18 xl:mx-32"
  >
    <div
      v-if="!state.isSearching"
      class="flex gap-4 w-full justify-between p-2"
    >
      <Logo />
      <div class="flex justify-between gap-4 xl:gap-8">
        <button id="search-btn" class="" @click="setIsSearching(true)">
          <Search />
        </button>
        <button class="" @click="router.push('/')">
          <Home />
        </button>
        <button class="" @click="router.push('/me')">
          <User
            v-if="!(profile.avatar_url || auth.user.user_metadata.avatar_url)"
          />
          <div v-else class="w-8 h-8 rounded-full overflow-hidden">
            <img
              :src="profile.avatar_url || auth.user.user_metadata.avatar_url"
              alt="user avatar"
            />
          </div>
        </button>
      </div>
    </div>
    <div
      v-else
      class="w-full flex gap-1 bg-neutral-900 rounded-lg overflow-hidden pr-3"
    >
      <input
        ref="searchInputRef"
        v-model="state.searchText"
        name="search"
        type="text"
        class="px-4 py-3 outline-none bg-neutral-900 w-full h-full text-lg flex-1"
        placeholder="Search ..."
      />
      <button
        @click="
          () => {
            setIsSearching(false)
            state.searchText = ''
            setProfiles([])
          }
        "
      >
        <X />
      </button>
    </div>
  </div>
</template>

<style>
  button {
    cursor: pointer;
  }
</style>
