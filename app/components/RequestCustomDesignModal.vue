<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      @keydown.esc.prevent.stop="onClose"
    >
      <div class="absolute inset-0 bg-gray-90/60 backdrop-blur-sm" @click="onClose" />
      <div
        class="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl border border-gray-20"
      >
        <div class="p-6 md:p-8">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-gray-90">Vraag een custom design aan</h3>
              <p class="text-sm text-gray-60 mt-1">Vul je totem en e-mailadres in. We nemen snel contact op.</p>
            </div>
            <button
              type="button"
              class="shrink-0 w-9 h-9 rounded-full bg-accent text-gray-70 hover:text-gray-90 transition-colors flex items-center justify-center"
              aria-label="Sluiten"
              @click="onClose"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-5">
            <div>
              <label for="totem" class="block text-sm font-medium text-gray-80 mb-1">Totem</label>
              <input
                id="totem"
                v-model.trim="totem"
                type="text"
                autocomplete="off"
                class="w-full px-4 py-3 rounded-xl border border-gray-20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-50"
                placeholder="Bijv. Wolf"
              />
              <p v-if="errors.totem" class="mt-1 text-sm text-red-600">{{ errors.totem }}</p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-80 mb-1">E-mailadres</label>
              <input
                id="email"
                v-model.trim="email"
                type="email"
                autocomplete="off"
                class="w-full px-4 py-3 rounded-xl border border-gray-20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-50"
                placeholder="Bijv. naam@domein.be"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                class="px-5 py-2.5 rounded-full bg-white border border-gray-20 text-gray-80 hover:bg-accent transition-colors"
                @click="onClose"
              >
                Annuleren
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-70 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Versturen</span>
                <svg v-if="submitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="submitted" class="absolute inset-0 bg-white/95 rounded-2xl p-8 flex items-center justify-center">
            <div class="text-center space-y-3">
              <CheckCircle class="w-12 h-12 text-green-600 mx-auto" />
              <h4 class="text-lg font-semibold text-gray-90">Aanvraag verzonden</h4>
              <p class="text-sm text-gray-60">Bedankt! We nemen snel contact met je op.</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, CheckCircle } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted', payload: { totem: string; email: string; message: string }): void
}>()

const totem = ref('')
const email = ref('')
const message = ref('')
const submitting = ref(false)
const submitted = ref(false)

const errors = ref<{ totem?: string; email?: string }>({})

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = () => {
  errors.value = {}

  if (!totem.value || totem.value.length < 2) {
    errors.value.totem = 'Geef een geldige totem op.'
  }

  if (!email.value) {
    errors.value.email = 'Voer een e-mailadres in.'
  } else if (!isValidEmail(email.value)) {
    errors.value.email = 'Voer een geldig e-mailadres in.'
  }

  return Object.keys(errors.value).length === 0
}

const onClose = () => {
  if (submitting.value) return
  emit('close')
}

const onSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  try {
    await new Promise(r => setTimeout(r, 900))
    submitted.value = true
    emit('submitted', { totem: totem.value, email: email.value })
    setTimeout(() => {
      emit('close')
    }, 1000)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
