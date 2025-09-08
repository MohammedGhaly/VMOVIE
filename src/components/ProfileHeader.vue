<script setup>
  import { User } from 'lucide-vue-next'
  import { useAuthStore } from '../stores/auth'

  const props = defineProps({ profile: { type: Object, required: true } })
  const auth = useAuthStore()
</script>

<template>
  <div class="flex gap-6 mx-6 items-center">
    <div class="rounded-full overflow-hidden">
      <img
        v-if="auth.user.user_metadata.avatar_url"
        :src="auth.user.user_metadata.avatar_url"
        alt="profile picture"
        class="aspect-square"
      />
      <User v-else size="50" />
    </div>
    <div class="flex-1 space-y-3">
      <p class="font-semibold text-xl">@{{ props.profile.username }}</p>
      <div class="flex justify-start gap-8 mt-3">
        <div>
          <h4 class="font-semibold">followers</h4>
          <p class="font-semibold">{{ props.profile.followersCount }}</p>
        </div>
        <div>
          <h4 class="font-semibold">following</h4>
          <p class="font-semibold">{{ props.profile.followingCount }}</p>
        </div>
        <div>
          <h4 class="font-semibold">movies</h4>
          <p class="font-semibold">{{ props.profile.moviesCount }}</p>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
