<script setup>
  import { inject } from 'vue'
  import router from '../router'

  const props = defineProps({
    profile: { type: Object, default: new Object() },
  })
  const { setIsSearching } = inject('searchStore')
</script>

<template>
  <div
    class="w-full flex justify-start gap-4 h-20 rounded-2xl bg-neutral-800 p-3 hover:brightness-105 transition-all duration-300 cursor-pointer"
    @click="
      () => {
        router.push(`/profile/${profile.id}`)
        setIsSearching(false)
      }
    "
  >
    <div class="overflow-hidden rounded-full h-full aspect-square">
      <img
        v-if="props.profile.avatar_url"
        class="w-full h-full"
        :src="props.profile.avatar_url"
        alt="user avatar"
      />
      <div
        v-else
        class="h-full w-full flex justify-center items-center bg-blue-950"
      >
        <p class="text-4xl">
          {{ props.profile.username[0].toUpperCase() }}
        </p>
      </div>
    </div>
    <div>
      <p class="font-bold text-xl">@{{ profile.username }}</p>
      <p class="font-semibold">{{ profile.full_name }}</p>
    </div>
  </div>
</template>
