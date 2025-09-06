<script setup>
  import gsap from 'gsap'
  import { Star } from 'lucide-vue-next'
  import { watch, ref } from 'vue'

  const props = defineProps({
    value: { type: Number, required: true },
    fill: { type: String, required: true },
    rate: { type: Number, required: true },
  })
  const emit = defineEmits(['setHoverRate', 'setRate'])
  const starWrapper = ref(null)

  const expand = () => {
    const container = starWrapper.value?.parentElement
    if (!container) return

    const starsToAnimate = container.querySelectorAll('.transition-star')
    gsap.to(starsToAnimate, {
      display: 'inline-block',
    })
    gsap.fromTo(
      starsToAnimate,
      {
        x: -40, // Translates left
        opacity: 0, // Fades out
        duration: 0.25,
        stagger: 0.03,
      },
      { x: 0, opacity: 1, direction: 0.25, stagger: 0.03 },
    )
    gsap.to(starWrapper.value, {
      scale: 1,
      duration: 0.25,
      ease: 'bounce.in',
    })
  }
  const collapse = () => {
    const container = starWrapper.value?.parentElement
    if (!container) return

    const starsToAnimate = container.querySelectorAll('.transition-star')
    gsap.to(starsToAnimate, {
      x: -40, // Translates left
      opacity: 0, // Fades out
      duration: 0.25,
      stagger: 0.03,
      onComplete() {
        gsap.to(starsToAnimate, {
          display: 'None',
        })
      },
    })
    gsap.to(starWrapper.value, {
      scale: 1.8,
      duration: 0.25,
      ease: 'bounce.out',
    })
  }

  watch(
    () => props.rate,
    (newVal, oldVal) => {
      if (props.value === 1) {
        if (newVal > 0 && newVal !== oldVal) {
          collapse()
        } else if (newVal === 0) expand()
      }
    },
  )
</script>

<template>
  <span
    ref="starWrapper"
    class="relative inline-block"
    :class="{ 'transition-star': props.value > 1 }"
  >
    <Star
      color="#312c85"
      :fill="props.fill"
      @mouseenter="emit('setHoverRate', props.value)"
      @click.stop="emit('setRate', props.rate === 0 ? props.value : 0)"
    />
    <span
      v-if="props.value === 1 && props.rate > 0"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white"
    >
      {{ props.rate }}
    </span>
  </span>
</template>
