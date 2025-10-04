<template>
  <section class="bg-primary-70 py-10 md:py-20">
    <div class="px-5 md:px-20 xl:max-w-screen-2xl mx-auto">
      <div class="bg-gray-20 rounded-3xl p-6 md:p-14 space-y-10 md:space-y-20">
        <!-- Header -->
        <div class="text-center space-y-4">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <div class="w-4 h-4 bg-primary-50 rounded-full relative">
              <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
            </div>
            <span class="text-primary-50 font-medium">Hoe het werkt</span>
          </div>
          
          <!-- Title and Description -->
          <div class="space-y-6">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
              Jouw totem op je kledij in 4 eenvoudige stappen
            </h2>
            <p class="text-lg lg:text-xl font-medium text-gray-60 mx-auto max-w-3xl">
              Van het kiezen van je totem tot het dragen van je nieuwe kleding, zo simpel kan het zijn.
            </p>
          </div>
        </div>

        <!-- Process Steps -->
        <div class="space-y-10 md:space-y-16">
          <!-- Step 1 -->
          <div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div class="flex-1 space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Zoek jouw totemdier
              </h3>
              <p class="text-base md:text-lg lg:text-xl text-gray-60 leading-relaxed">
                Kies je totem uit onze uitgebreide collectie. Vind je jouw totem nog niet terug? Geen probleem, we maken een uniek design speciaal voor jou.
              </p>
            </div>
            
            <div class="w-full lg:w-[556px] relative h-[240px] md:h-[320px] rounded-3xl overflow-hidden order-1 lg:order-2">
              <img 
                src="/img/book.png" 
                alt="Zoek jouw totemdier"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 bg-accent text-primary-60 w-[100px] md:w-[130px] h-20 md:h-20 rounded-3xl rounded-bl-none md:rounded-bl-3xl flex items-center justify-center text-2xl md:text-4xl font-semibold tracking-tight">
                01
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div class="w-full lg:w-[556px] relative h-[240px] md:h-[320px] rounded-3xl overflow-hidden order-1">
              <img 
                src="/img/shirts.png" 
                alt="Selecteer jouw kledij"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 right-0 bg-accent text-primary-60 w-[100px] md:w-[130px] h-20 md:h-20 rounded-3xl rounded-br-none md:rounded-br-3xl flex items-center justify-center text-2xl md:text-4xl font-semibold tracking-tight">
                02
              </div>
            </div>
            
            <div class="flex-1 space-y-4 md:space-y-6 order-2">
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Selecteer jouw kledij
              </h3>
              <p class="text-base md:text-lg lg:text-xl text-gray-60 leading-relaxed">
                Beslis of je een T-shirt, sweater of hoodie wil. We bieden verschillende modellen en kleuren die perfect passen bij jouw stijl of je groep.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div class="flex-1 space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Wij gaan aan de slag
              </h3>
              <p class="text-base md:text-lg lg:text-xl text-gray-60 leading-relaxed">
                Zodra je bestelling binnen is, starten wij met het bedrukken. Elk stuk wordt zorgvuldig en met oog voor detail gemaakt.
              </p>
            </div>
            <div class="w-full lg:w-[556px] relative h-[240px] md:h-[320px] rounded-3xl overflow-hidden order-1 lg:order-2">
              <img 
                src="/img/package.png" 
                alt="Wij gaan aan de slag"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 left-0 bg-accent text-primary-60 w-[100px] md:w-[130px] h-20 rounded-3xl rounded-bl-none md:rounded-bl-3xl flex items-center justify-center text-2xl md:text-4xl font-semibold tracking-tight">
                03
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div class="w-full lg:w-[556px] relative h-[240px] md:h-[320px] rounded-3xl overflow-hidden order-1">
              <img 
                src="/img/delivery.png" 
                alt="Draag je totem met trots"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 right-0 bg-accent text-primary-60 w-[100px] md:w-[130px] h-20 rounded-3xl rounded-br-none md:rounded-br-3xl flex items-center justify-center text-2xl md:text-4xl font-semibold tracking-tight">
                04
              </div>
            </div>
            <div class="flex-1 space-y-4 md:space-y-6 order-2">
              <h3 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Draag je totem met trots
              </h3>
              <p class="text-base md:text-lg lg:text-xl text-gray-60 leading-relaxed">
                Binnen 1 à 2 weken ontvang je jouw kledingstuk. Klaar om je totem overal te tonen op kamp, op zondag of gewoon onderweg.
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
