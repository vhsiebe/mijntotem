<script setup>
import { Star, Palette, Shield } from 'lucide-vue-next'

const props = defineProps({ name: String })
const lower = computed(() => props.name.toLowerCase())
</script>


<template>
  <section class="px-5 md:px-20 py-16 bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gray-90 mb-12">Waarom kiezen voor de {{ name }}?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Star class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-gray-90">Unieke Betekenis</h3>
          <p class="text-gray-60">Elke {{ lower }} totem heeft een diepe symbolische betekenis die jouw persoonlijkheid weergeeft.</p>
        </div>
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Palette class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-gray-90">Handgemaakt</h3>
          <p class="text-gray-60">Alle {{ lower }} producten worden met zorg handgemaakt op aanvraag.</p>
        </div>
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Shield class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-gray-90">Kwaliteitsgarantie</h3>
          <p class="text-gray-60">We staan achter de kwaliteit van onze {{ lower }} producten met een volledige garantie.</p>
        </div>
      </div>
    </div>
  </section>
</template>