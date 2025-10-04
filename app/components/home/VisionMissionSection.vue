<template>
  <section class="container mx-auto py-20 space-y-10">
    <!-- Header -->
    <div class="text-center space-y-4 px-25">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
        <div class="w-4 h-4 bg-primary-50 rounded-full relative">
          <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
        </div>
        <span class="text-primary-50 font-medium">Visie en Missie</span>
      </div>
      
      <!-- Title -->
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight max-w-[780px] mx-auto">
        Trots op je totem, zorg voor de natuur
      </h2>
    </div>

    <!-- Vision and Mission Cards -->
    <div class="flex gap-10 flex-col md:flex-row">
      <!-- Vision Card -->
      <div class="flex-1 relative h-[420px] rounded-3xl overflow-hidden">
        <div 
          class="w-full h-full bg-cover bg-center relative"
          style="background-image: url('/img/vision.webp')"
        >
          <!-- Overlay for better text readability -->
          <div class="absolute inset-0 bg-black/20"></div>
          
          <!-- Content -->
          <div class="relative h-full flex flex-col items-center md:items-start justify-center md:justify-between p-4 md:p-6">
            <!-- Badge -->
            <div class="inline-flex items-center justify-center bg-primary-80 text-white rounded-full px-6 py-4 text-xl md:text-2xl font-bold w-fit">
              ONZE VISIE
            </div>
            
            <!-- Description -->
            <div class="p-2 md:p-6 rounded-lg">
              <p class="text-secondary-10 text-base md:text-xl font-medium leading-relaxed">
                Scouts zijn trots op hun totem. Wij geloven dat die trots ook zichtbaar mag zijn in het dagelijks leven. Met unieke ontwerpen en kwalitatieve kledij willen we de totemtraditie mee levendig houden.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Card -->
      <div class="flex-1 relative h-[420px] rounded-3xl overflow-hidden">
        <div 
          class="w-full h-full bg-cover bg-center relative"
          style="background-image: url('/img/mission.webp')"
        >
          <!-- Overlay for better text readability -->
          <div class="absolute inset-0 bg-black/20"></div>
          
          <!-- Content -->
          <div class="relative h-full flex flex-col items-center md:items-start justify-center md:justify-between p-4 md:p-6">
            <!-- Badge -->
            <div class="inline-flex items-center justify-center bg-primary-80 text-white rounded-full px-6 py-4 text-xl md:text-2xl font-bold w-fit">
              ONZE MISSIE
            </div>
            
            <!-- Description -->
            <div class="p-2 md:p-6">
              <p class="text-white text-base md:text-xl font-medium leading-relaxed">
                We maken totems tastbaar in stijlvolle, duurzame en ecologische kleding. Zo kan elke scout zijn identiteit tonen, met trots voor de groep én respect voor de natuur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
