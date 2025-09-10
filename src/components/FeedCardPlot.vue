<script setup>
  import { ref } from 'vue'

  const props = defineProps({ plot: { type: String, default: '' } })
  const expanded = ref(false)
</script>

<template>
  <p
    class="w-full text-sm text-gray-300 bg-neutral-800 rounded-md p-2 overflow-y-auto"
  >
    <span class="font-semibold">Plot:</span>
    {{ expanded ? props.plot : props.plot.slice(0, 90) }}
    <span class="font-semibold underline" @click="expanded = !expanded">
      {{ expanded ? 'collapse' : '...read more' }}
    </span>
  </p>
</template>
