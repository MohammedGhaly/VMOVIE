<script setup>
  import { computed, ref } from 'vue'
  import { fetchAndReviewMovie } from '../services/supabaseServices'
  import { useAuthStore } from '../stores/auth'
  import StarRating from './StarRating.vue'

  const props = defineProps({
    imdbId: {
      type: String,
      required: true,
    },
  })

  console.log('from Rating=> ', props.imdbId)

  const auth = useAuthStore()
  const rate = ref(0)
  const hoverRate = ref(0)

  const displayRate = computed(() => hoverRate.value || rate.value)

  const getFill = (val) => {
    return displayRate.value >= val ? '#312c85' : '#00000000'
  }

  const setRate = async (val) => {
    rate.value = val
    try {
      if (auth.user) {
        await fetchAndReviewMovie(props.imdbId, auth.user.id, val)
      } else {
        console.error('User not logged in. Cannot rate movie.')
      }
    } catch (error) {
      console.error('Error rating movie:', error)
    }
  }

  const setHoverRate = (val) => {
    hoverRate.value = val
  }

  const resetHoverRate = () => {
    hoverRate.value = 0
  }

  const handleRerate = () => {
    if (rate.value > 0) setRate(0)
  }
</script>

<template>
  <div class="" @click="handleRerate" @mouseleave="resetHoverRate">
    <StarRating
      v-for="val in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :key="val"
      :value="val"
      :fill="getFill(val)"
      :rate="rate"
      @set-hover-rate="setHoverRate"
      @set-rate="setRate"
    />
  </div>
  <span v-if="rate === 0">{{ displayRate }}</span>
</template>
