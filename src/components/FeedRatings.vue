<script setup>
  import { Star } from 'lucide-vue-next'
  import imdbLogo from '/imdbLogo.svg'
  import metacriticLogo from '/metacriticLogo.svg'
  import rottentomatoesLogo from '/rottentomatoesLogo.svg'

  const props = defineProps({
    imdbrating: { type: String, default: null },
    rottentomatoesrating: { type: String, default: null },
    metacriticrating: { type: String, default: null },
    personalrating: { type: Number, default: null },
  })
</script>

<template>
  <div
    class="ratings grid grid-cols-2 gap-3 *:font-semibold *:items-center *:text-lg h-fit w-full"
  >
    <div
      v-if="props.personalrating"
      class="p-2 flex items-center gap-3 bg-indigo-700/20 justify-center rounded-lg"
    >
      <Star fill="#312c85" class="w-8 h-8" />
      {{ props.personalrating }}
    </div>
    <div
      v-if="props.imdbrating"
      class="p-2 flex items-center gap-3 justify-center rounded-lg"
      :class="{
        'bg-green-700/30': props.imdbrating >= '7.5/10',
        'bg-yellow-700/20':
          props.imdbrating < '7.5/10' && props.imdbrating >= '6.0/10',
        'bg-red-700/20': props.imdbrating < '6.0/10',
      }"
    >
      <img class="w-8 h-8" :src="imdbLogo" alt="imdb" />
      {{ props.imdbrating.replace('/10', '') }}
    </div>
    <div
      v-if="props.rottentomatoesrating"
      class="p-2 flex items-center gap-3 justify-center rounded-lg"
      :class="{
        'bg-green-700/30': props.rottentomatoesrating >= '85%',
        'bg-yellow-700/20':
          props.rottentomatoesrating < '85%' &&
          props.rottentomatoesrating >= '65%',
        'bg-red-700/20': props.rottentomatoesrating < '65%',
      }"
    >
      <img :src="rottentomatoesLogo" alt="rotten tomatoes" class="w-8 h-8" />
      {{ props.rottentomatoesrating }}
    </div>
    <div
      v-if="props.metacriticrating"
      class="p-2 flex items-center gap-3 justify-center rounded-lg"
      :class="{
        'bg-green-700/30': props.metacriticrating >= '75/100',
        'bg-yellow-700/20':
          props.metacriticrating < '75/100' &&
          props.metacriticrating >= '60/100',
        'bg-red-700/20': props.metacriticrating < '60/100',
      }"
    >
      <img class="w-8 h-8" :src="metacriticLogo" alt="imdb" />
      {{ props.metacriticrating.replace('/100', '%') }}
    </div>
  </div>
</template>
