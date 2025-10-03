<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

const show = ref(false)

const open = () => { show.value = true }
const onSubmitted = async ({ totem, email }) => {
  await useFetch('/api/totem', {
    method: 'POST',
    body: JSON.stringify({ totem, email })
  })
}
</script>

<template>
        <!-- CTA Section -->
        <section class="px-5 py-16 md:px-20 bg-primary-70">
      <div class="text-center space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold text-white leading-tight">
          Kan je jouw totem niet vinden?
        </h2>
        <p class="text-xl text-primary-30 max-w-2xl mx-auto">
          Geen probleem! We maken graag een uniek design voor jouw specifieke totem. 
          Neem contact met ons op voor een persoonlijk ontwerp.
        </p>
        <button @click="open" class="bg-secondary-60 text-primary px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 mx-auto shadow-lg hover:bg-secondary-60/90 transition-colors">
          Vraag een custom design aan
          <ArrowUpRight class="w-5 h-5" />
        </button>
      </div>
    </section>

    <RequestCustomDesignModal
      v-if="show"
      @close="show = false"
      @submitted="onSubmitted"
    />
</template>