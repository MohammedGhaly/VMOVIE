<script setup>
  import { computed, ref } from 'vue'
  import { fetchAndReviewMovie } from '../services/supabaseServices'
  import { useAuthStore } from '../stores/auth'
  import StarRating from './StarRating.vue'
  import { Edit, PlusCircle } from 'lucide-vue-next'
  import { useToast } from 'vue-toastification'

  const props = defineProps({
    imdbId: {
      type: String,
      required: true,
    },
    initialRate: { type: Number, default: 0 },
    initialReview: { type: String, default: '' },
  })
  const rate = ref(props.initialRate)
  const hoverRate = ref(0)
  const review = ref(props.initialReview)
  const submittedReview = ref('')

  const toast = useToast()

  const displayRate = computed(() => hoverRate.value || rate.value)

  const auth = useAuthStore()

  const getFill = (val) => {
    return displayRate.value >= val ? '#312c85' : '#00000000'
  }

  const setRate = async (val) => {
    if (rate.value === val) return
    rate.value = val
    try {
      if (auth.user) {
        await fetchAndReviewMovie(props.imdbId, auth.user.id, val, review.value)
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

  // const handleRerate = () => {
  //   if (rate.value > 0) setRate(0)
  // }

  const submitReview = (value) => {
    if (rate.value === 0) {
      toast.error('please add a rating before adding a review')
      return
    }
    submittedReview.value = value
  }

  const editReviewClicked = () => {
    submittedReview.value = ''
  }
</script>

<template>
  <div class="w-full flex flex-col items-center gap-8">
    <div class="" @mouseleave="resetHoverRate">
      <StarRating
        v-for="val in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="val"
        :value="val"
        :fill="getFill(val)"
        :rate="rate"
        :size="28"
        :is-movie-view="true"
        @set-hover-rate="setHoverRate"
        @set-rate="setRate"
      />
    </div>
    <div class="w-full relative">
      <textarea
        v-model="review"
        :readonly="submittedReview !== ''"
        maxlength="180"
        placeholder="add a review"
        class="w-full flex p-3 resize-none pb-5 bg-neutral-800 rounded-lg"
        :class="[submittedReview === '' ? 'min-h-32' : 'h-fit']"
      >
      </textarea>
      <button class="absolute bottom-2 right-2">
        <PlusCircle v-if="submittedReview === ''" @click.stop="submitReview" />
        <Edit v-else @click.stop="editReviewClicked" />
      </button>
    </div>
  </div>
</template>
