<script setup>
  import { inject, ref, watch } from 'vue'
  import { searchProfile } from '../services/supabaseServices'
  import ProfileSearchItem from './ProfileSearchItem.vue'
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  const { state, setProfiles } = inject('searchStore')
  const isLoading = ref(false)
  const error = ref('')

  watch(
    () => state.searchText,
    async (newVal, _oldVal, onCleanup) => {
      const controller = new AbortController()
      try {
        error.value = ''
        if (newVal.length > 2) {
          isLoading.value = true
          const timeoutId = setTimeout(() => {
            searchProfile(newVal, controller)
              .then((res) => {
                setProfiles(res)
              })
              .finally(() => {
                isLoading.value = false
              })
              .catch((err) => {
                if (err.name !== 'AbortError') {
                  console.error(err)
                }
                error.value = err.message
              })
          }, 500)

          onCleanup(() => {
            clearTimeout(timeoutId)
            controller.abort()
          })
        } else {
          setProfiles([])
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          if (err) error.value = err.message
        }
      }
    },
  )
</script>

<template>
  <div class="flex flex-col gap-2 w-full px-3 md:w-4/5 xl:w-3/5 md:mx-auto">
    <SyncLoader
      v-if="isLoading"
      color="#fff"
      size="15px"
      class="mx-auto my-20"
    />
    <template v-else>
      <ProfileSearchItem
        v-for="profile in state.profilesSearch"
        :key="profile.id"
        :profile="profile"
      />
    </template>
  </div>
</template>
