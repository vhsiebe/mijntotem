<template>
  <section class="px-5 py-10 md:px-20 md:py-20 xl:max-w-screen-2xl mx-auto">
    <div class="rounded-3xl p-6 md:p-12 lg:p-20 space-y-6 md:space-y-10 bg-cover bg-center relative" style="background-image: url('/img/cta.webp')">
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/50 rounded-3xl"></div>
      <div class="max-w-[575px] space-y-4 md:space-y-6 relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight tracking-tight">
          Klaar voor een samenwerking?
        </h2>
        <p class="text-base md:text-lg lg:text-xl text-gray-30 leading-relaxed">
          Van idee tot levering: wij helpen scouts­groepen met unieke truien die verbondenheid en traditie uitstralen.
        </p>
      </div>
      
      <nuxt-link to="/contact" class="bg-secondary-60 text-primary px-4 py-3 md:px-6 md:py-3 w-fit rounded-full font-medium text-base md:text-lg lg:text-xl flex items-center gap-2 md:gap-3 hover:bg-secondary-60/90 transition-colors relative z-10">
        Neem contact met ons op
        <ArrowUpRight class="w-5 h-5 md:w-6 md:h-6" />
      </nuxt-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>
