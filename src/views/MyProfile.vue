<script setup>
  import { signOut } from '../services/supabaseServices'
</script>

<template>
  <div>My Profile</div>
  <button class="bg-indigo-800" @click="signOut">logout</button>
</template>
