<script setup>
  import { ref } from 'vue'

  const props = defineProps({ plot: { type: String, default: '' } })
  const expanded = ref(false)
</script>

<template>
  <p
    class="w-full text-base text-gray-300 bg-neutral-800 rounded-lg p-2 md:text-lg"
  >
    <span class="font-semibold">Plot:</span>
    {{ expanded ? props.plot : props.plot.slice(0, 90) }}
    <span class="font-semibold underline" @click="expanded = !expanded">
      {{ expanded ? 'collapse' : '...read more' }}
    </span>
  </p>
</template>
