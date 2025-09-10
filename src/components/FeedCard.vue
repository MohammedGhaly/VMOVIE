<script setup>
  import { ref } from 'vue'
  import FeedRatings from './FeedRatings.vue'
  import timeSince from '../utils/timeSince'
  import FeedCardPlot from './FeedCardPlot.vue'

  const props = defineProps({
    review: { type: Object, reuqired: true, default: () => {} },
  })
  const expanded = ref(false)
</script>

<template>
  <div class="flex flex-col gap-3 p-3 bg-neutral-900 rounded-xl">
    <!-- profile -->
    <div class="flex items-center gap-2">
      <img
        class="rounded-full aspect-square h-16"
        :src="props.review.avatar_url"
        :alt="`${props.review.username} profile`"
      />
      <div>
        <h2>
          @
          <span class="font-semibold">
            {{ props.review.username }}
          </span>
          watched a new movie
        </h2>
        <h3 class="text-gray-500">
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
    <h3 class="font-semibold text-xl mb-1">
      {{ props.review.title }}
    </h3>
    <p v-if="props.review.length > 0" class="mb-4">
      <br />
      {{ expanded ? props.review.review : props.plot.slice(0, 90) }}
      <span class="font-semibold underline" @click="expanded = !expanded">
        {{ expanded ? 'collapse' : '...read more' }}
      </span>
    </p>
    <!-- poster & ratings -->
    <div class="flex gap-4">
      <img
        class="rounded-lg w-40"
        :src="props.review.posterurl"
        :alt="`${props.review.title} poster`"
      />
      <div class="flex flex-col gap-3 overflow-y-scroll">
        <FeedRatings
          :imdbrating="props.review.imdbrating"
          :rottentomatoesrating="props.review.rottentomatoesrating"
          :metacriticrating="props.review.metacriticrating"
          :personalrating="props.review.personalrating"
        />
        <div class="flex-1 max-h-29 overflow-y-scroll">
          <FeedCardPlot :plot="props.review.plot" />
        </div>
      </div>
    </div>
  </div>
</template>
