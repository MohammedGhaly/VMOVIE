<script setup>
  import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  const props = defineProps({
    isLoading: { type: Boolean, default: false },
    text: { type: String, required: true },
  })
</script>

<template>
  <button
    v-if="!isLoading"
    role="submit"
    class="bg-indigo-800 p-2 mt-4 font-semibold rounded-lg text-lg xl:w-4/5 xl:mx-auto"
  >
    {{ props.text }}
  </button>
  <button
    v-else
    role="submit"
    class="bg-indigo-800 p-2 mt-4 font-semibold rounded-lg text-lg xl:w-4/5 xl:mx-auto"
  >
    <SyncLoader color="#fff" size="10px" />
  </button>
</template>
