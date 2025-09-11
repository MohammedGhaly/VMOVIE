<script setup>
  import { ref } from 'vue'
  import FeedRatings from './FeedRatings.vue'
  import timeSince from '../utils/timeSince'
  import router from '../router'

  const props = defineProps({
    review: { type: Object, reuqired: true, default: () => {} },
  })
  const expanded = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3 p-3 bg-neutral-900 rounded-xl lg:gap-5">
    <!-- profile -->
    <div class="flex items-center gap-2 lg:gap-5">
      <img
        class="rounded-full aspect-square h-12 lg:h-16 cursor-pointer"
        :src="props.review.avatar_url"
        :alt="`${props.review.username} profile`"
        @click="router.push(`/profile/${props.review.user_id}`)"
      />
      <div>
        <h2 class="lg:text-lg">
          <span
            class="font-semibold cursor-pointer"
            @click="router.push(`/profile/${props.review.user_id}`)"
          >
            @{{ props.review.username }}
          </span>
          watched a new movie
        </h2>
        <h3 class="text-gray-500 lg:text:lg">
          rated with
          <span class="font-semibold text-gray-400">
            {{ props.review.personalrating }}⭐
          </span>
          .
          {{ timeSince(props.review.watched_at) }}
        </h3>
      </div>
    </div>
    <!-- review text -->
    <h3
      class="font-semibold text-xl hover:underline cursor-pointer lg:text-2xl"
      @click="router.push(`/movie/${props.review.imdbid}`)"
    >
      {{ props.review.title }}
    </h3>
    <p v-if="props.review.review.length > 0" class="mb-4 lg:text-lg -mt-3">
      {{ expanded ? props.review.review : props.review.review.slice(0, 90) }}
      <span
        v-if="props.review.review.length > 90"
        class="font-semibold underline"
        @click="expanded = !expanded"
      >
        {{ expanded ? 'collapse' : '...read more' }}
      </span>
    </p>
    <!-- poster & ratings -->
    <div class="flex gap-4">
      <img
        class="rounded-lg w-40 lg:w-48 cursor-pointer"
        :src="props.review.posterurl"
        :alt="`${props.review.title} poster`"
        @click="router.push(`/movie/${props.review.imdbid}`)"
      />
      <div class="flex flex-col gap-3">
        <FeedRatings
          :imdbrating="props.review.imdbrating"
          :rottentomatoesrating="props.review.rottentomatoesrating"
          :metacriticrating="props.review.metacriticrating"
          :personalrating="props.review.personalrating"
        />
        <p
          class="max-h-29 xl:max-h-42 overflow-y-auto w-full text-sm lg:text-lg text-gray-300 bg-neutral-800 rounded-md p-2"
        >
          <span class="font-semibold">Plot:</span>
          {{ props.review.plot }}
        </p>
      </div>
    </div>
  </div>
</template>
