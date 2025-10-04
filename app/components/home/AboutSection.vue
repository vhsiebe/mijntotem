<template>
  <section class="px-5 py-10 md:px-20 md:py-32 xl:max-w-screen-2xl mx-auto">
    <div class="flex flex-col lg:flex-row lg:items-start gap-10">
      <!-- Content (First on mobile, second on desktop) -->
      <div class="flex-1 space-y-10 lg:space-y-16 order-2 lg:order-1">
        <!-- Header -->
        <div class="text-center lg:text-left space-y-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <div class="w-4 h-4 bg-primary-50 rounded-full relative">
              <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
            </div>
            <span class="text-primary-50 font-medium">Over ons</span>
          </div>

          <!-- Title and Description -->
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
              Jouw totem, trots op je kledij
            </h2>
            <p class="text-lg lg:text-xl text-gray-60 leading-relaxed">
              Ik ben <strong>Siebe</strong>, oprichter van MijnTotem. Wat begon als een hobby in textielbedrukking,
        groeide uit tot een merk dat de <strong>scoutstraditie</strong> centraal zet. Totems zijn een symbool van
        fierheid en verbondenheid. Daarom ontwerpen en maken we kleding waarin jouw totem echt tot leven komt.
            </p>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="space-y-10">
          <!-- Feature 1 -->
           <!-- Feature 2 -->
           <div class="flex items-center gap-4">
            <div class="bg-primary-90/20 p-2 rounded-lg flex-shrink-0">
              <PawPrint class="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-gray-80">Alle totems, uitgewerkt</h3>
              <p class="text-gray-60">
                We proberen <strong>alle totems die er zijn</strong> aan te bieden,elk met een eigen illustratie.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-primary-90/20 p-2 rounded-lg flex-shrink-0">
              <PenTool class="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-gray-80">Eigen ontwerp & vakmanschap</h3>
              <p class="text-gray-60">
                Jaren ervaring in textielbedrukking: strakke prints, scherpe bedrukking en oog voor detail.
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="bg-primary-90/20 p-2 rounded-lg flex-shrink-0">
              <Signature class="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-gray-80">Persoonlijk & op maat</h3>
              <p class="text-gray-60">
                Van individuele stuks tot groepskledij, we denken mee en leveren wat bij jullie past.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-primary-90/20 p-2 rounded-lg flex-shrink-0">
              <Sparkles class="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-semibold text-gray-80">Scoutsproof kwaliteit</h3>
              <p class="text-gray-60">
                Duurzame materialen en wasbestendige prints, klaar voor elk kamp en elke activiteit.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- Image -->
      <div class="w-full lg:w-[520px] relative order-1 lg:order-2">
        <div
          class="w-full rounded-2xl h-auto bg-cover bg-center bg-gray-40"
        >
          <img src="/img/about.jpg" alt="About" class="w-full rounded-2xl md:rounded-3xl h-auto object-cover" />
        </div>
        <NuxtLink to="/over-ons" class="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-primary text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-lg md:text-xl flex items-center gap-2 shadow-lg">
          Meer over ons
          <ArrowUpRight class="w-5 h-5 md:w-6 md:h-6" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, PenTool, PawPrint, Signature, Sparkles } from 'lucide-vue-next'
</script>
