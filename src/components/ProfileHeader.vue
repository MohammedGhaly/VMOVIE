<script setup>
  import { ref } from 'vue'
  import { User } from 'lucide-vue-next'
  import UpdateProfilePictureModal from './UpdateProfilePictureModal.vue'

  const props = defineProps({ profile: { type: Object, required: true } })
  const emit = defineEmits(['update:profile'])

  const showPicModal = ref(false)

  const handleProfileUpdate = (updatedProfile) => {
    emit('update:profile', updatedProfile)
  }
</script>

<template>
  <div class="flex gap-6 mx-6 items-start">
    <div
      class="rounded-full overflow-hidden cursor-pointer"
      @click="showPicModal = true"
    >
      <img
        v-if="props.profile.avatar_url"
        :src="props.profile.avatar_url"
        alt="profile picture"
        class="aspect-square w-22 h-22 md:size-26"
      />
      <div v-else class="bg-neutral-800 p-4">
        <User size="50" />
      </div>
    </div>
    <div class="flex-1 space-y-3">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-xl">@{{ props.profile.username }}</h2>
        <slot name="logout"></slot>
      </div>
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
      <slot name="follow"></slot>
    </div>
  </div>

  <UpdateProfilePictureModal
    v-if="showPicModal"
    @close-pic-modal="showPicModal = false"
    @update:profile="handleProfileUpdate"
  />
</template>
