<script setup>
  const props = defineProps({ activeTab: { type: String, default: 'movies' } })
  defineEmits(['setProfileTab'])
</script>

<template>
  <div
    class="flex w-full gap-3 py-2 px-3 md:w-3/5 md:mx-auto *:w-full *:rounded-lg font-semibold text-xl *:py-2 *:transition-all *:duration-200 *:hover:brightness-105"
  >
    <button
      :class="{
        'bg-neutral-700': props.activeTab === 'movies',
        'bg-neutral-800': props.activeTab !== 'movies',
      }"
      @click="$emit('setProfileTab', 'movies')"
    >
      Featured
    </button>
    <button
      :class="{
        'bg-neutral-700': props.activeTab === 'all',
        'bg-neutral-800': props.activeTab !== 'all',
      }"
      @click="$emit('setProfileTab', 'all')"
    >
      All Movies
    </button>
    <button
      :class="{
        'bg-neutral-700': props.activeTab === 'settings',
        'bg-neutral-800': props.activeTab !== 'settings',
      }"
      @click="$emit('setProfileTab', 'settings')"
    >
      Settings
    </button>
  </div>
</template>
