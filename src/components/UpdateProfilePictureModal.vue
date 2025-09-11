<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { supabase } from '../services/supabase'

  const auth = useAuthStore()
  const file = ref(null)
  const fileInput = ref(null)
  const loading = ref(false)
  const emit = defineEmits(['closePicModal', 'update:profile'])

  const handleFileChange = (e) => {
    file.value = e.target.files[0]
  }

  const openFileDialog = () => {
    fileInput.value.click()
  }

  const handleSubmit = async () => {
    if (!file.value) return

    loading.value = true
    const ext = file.value.name.split('.').pop()
    const filePath = `${auth.user.id}/avatar.${ext}`

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file.value, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      console.error('Error uploading file:', error)
      loading.value = false
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path)

    const { data: updatedUser, error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrlData.publicUrl })
      .eq('id', auth.user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating user:', updateError)
    } else {
      emit('update:profile', updatedUser)
      emit('closePicModal')
    }

    loading.value = false
  }

  // const handleSubmit = async () => {
  //   if (!file.value) return

  //   loading.value = true
  //   const ext = file.value.name.split('.').pop()
  //   const filePath = `${auth.user.id}/avatar.${ext}`

  //   const { data, error } = await supabase.storage
  //     .from('avatars')
  //     .upload(filePath, file.value, {
  //       cacheControl: '3600',
  //       upsert: true,
  //     })

  //   if (error) {
  //     console.error('Error uploading file:', error)
  //     loading.value = false
  //     return
  //   }

  //   // Save only the path
  //   const { data: updatedUser, error: updateError } = await supabase
  //     .from('profiles')
  //     .update({ avatar_url: data.path })
  //     .eq('id', auth.user.id)
  //     .select()
  //     .single()

  //   if (updateError) {
  //     console.error('Error updating user:', updateError)
  //   } else {
  //     emit('update:profile', updatedUser)
  //     emit('closePicModal')
  //   }

  //   loading.value = false
  // }
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-neutral-900 p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Update Profile Picture</h2>
      <form @submit.prevent="handleSubmit">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />

        <div v-if="file" class="mb-4">
          <p>Selected file: {{ file.name }}</p>
        </div>

        <div class="flex justify-end gap-4">
          <button
            type="button"
            class="px-4 py-2 rounded bg-neutral-700"
            @click="$emit('closePicModal')"
          >
            Cancel
          </button>
          <button
            v-if="!file"
            type="button"
            class="px-4 py-2 rounded bg-indigo-800/40"
            @click="openFileDialog"
          >
            Select picture
          </button>
          <button
            v-else
            type="submit"
            :disabled="loading"
            class="px-4 py-2 rounded bg-indigo-800/40 disabled:bg-blue-400"
          >
            {{ loading ? 'Uploading...' : 'Upload' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
