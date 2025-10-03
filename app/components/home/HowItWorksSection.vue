<template>
  <section class="bg-primary-70 py-20">
    <div class="container mx-auto px-20">
      <div class="bg-gray-20 rounded-3xl p-14 space-y-20">
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
            <h2 class="text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
              Jouw totem op je kledij in 4 eenvoudige stappen
            </h2>
            <p class="text-xl font-medium text-gray-60 mx-auto">
              Van het kiezen van je totem tot het dragen van je nieuwe kleding, zo simpel kan het zijn.
            </p>
          </div>
        </div>

        <!-- Process Steps -->
        <div class="space-y-10">
          <!-- Step 1 -->
          <div class="flex items-center gap-14">
            <div class="flex-1 space-y-6">
              <h3 class="text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Zoek jouw totemdier
              </h3>
              <p class="text-xl text-gray-60 leading-relaxed">
                Kies je totem uit onze uitgebreide collectie. Vind je jouw totem nog niet terug? Geen probleem, we maken een uniek design speciaal voor jou.
              </p>
            </div>
            
            <div class="w-[556px] relative h-[320px] rounded-3xl overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/cb9b15da01c5623fa450c27365830944fbce7942?width=1112" 
                alt="Zoek jouw totemdier"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 bg-accent text-primary-60 w-[130px] h-20 rounded-3xl flex items-center justify-center text-4xl font-semibold tracking-tight">
                01
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex items-center gap-14">
            <div class="w-[556px] relative h-[320px] rounded-3xl overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/8dba36580c66be1370aac226622ece94dfc0b43c?width=1112" 
                alt="Selecteer jouw kledij"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 right-0 bg-accent text-primary-60 w-[130px] h-20 rounded-3xl flex items-center justify-center text-4xl font-semibold tracking-tight">
                02
              </div>
            </div>
            
            <div class="flex-1 space-y-6">
              <h3 class="text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Selecteer jouw kledij
              </h3>
              <p class="text-xl text-gray-60 leading-relaxed">
                Beslis of je een T-shirt, sweater of hoodie wil. We bieden verschillende modellen en kleuren die perfect passen bij jouw stijl of je groep.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex items-center gap-14">
            <div class="flex-1 space-y-6">
              <h3 class="text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Wij gaan aan de slag
              </h3>
              <p class="text-xl text-gray-60 leading-relaxed">
                Zodra je bestelling binnen is, starten wij met het bedrukken. Elk stuk wordt zorgvuldig en met oog voor detail gemaakt.
              </p>
            </div>
            <div class="w-[556px] relative h-[320px] rounded-3xl  overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/08c1fc45b12a5670b7a9ed0ed655883c340536ee?width=1112" 
                alt="Get the Right Gear"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-6 right-6 bg-accent text-primary-60 w-[130px] h-16 rounded-full flex items-center justify-center text-4xl font-semibold tracking-tight">
                03
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex items-center gap-14">
            <div class="flex-1 space-y-6">
              <h3 class="text-4xl font-semibold text-gray-90 leading-tight tracking-tight">
                Draag je totem met trots
              </h3>
              <p class="text-xl text-gray-60 leading-relaxed">
                Binnen 1 à 2 weken ontvang je jouw kledingstuk. Klaar om je totem overal te tonen op kamp, op zondag of gewoon onderweg.
              </p>
            </div>
            
            <div class="w-[556px] relative h-[320px] rounded-3xl overflow-hidden bg-gray-40">
              <div class="absolute bottom-6 left-6 bg-accent text-primary-60 w-[130px] h-16 rounded-full flex items-center justify-center text-4xl font-semibold tracking-tight">
                04
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
