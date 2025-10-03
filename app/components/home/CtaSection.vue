<template>
  <section class="container mx-auto px-20 py-20">
    <div class="rounded-3xl p-20 space-y-10 bg-cover bg-center relative" style="background-image: url('/img/cta.webp')">
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/50 rounded-3xl"></div>
      <div class="max-w-[575px] space-y-6 relative z-10">
        <h2 class="text-6xl font-semibold text-white leading-tight tracking-tight">
          Klaar voor een samenwerking?
        </h2>
        <p class="text-xl text-gray-30 leading-relaxed">
          Van idee tot levering: wij helpen scouts­groepen met unieke truien die verbondenheid en traditie uitstralen.
        </p>
      </div>
      
      <nuxt-link to="/contact" class="bg-secondary-60 text-primary px-6 py-3 w-fit rounded-full font-medium text-xl flex items-center gap-3 hover:bg-secondary-60/90 transition-colors relative z-10">
        Neem contact met ons op
        <ArrowUpRight class="w-6 h-6" />
      </nuxt-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>
