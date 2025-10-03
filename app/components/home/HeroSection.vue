<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>
<template>
  <section class="px-5 py-10 md:px-20 md:py-20 xl:max-w-screen-2xl mx-auto">
    <div class="flex flex-col items-center lg:flex-row lg:items-start lg:gap-24">
      <!-- Content Section -->
      <div class="w-full lg:w-[600px] h-full flex flex-col justify-center items-center">
        <!-- Main Heading and CTA -->
        <div class="space-y-10 md:space-y-14">
          <div class="space-y-2">
            <h1 class="text-6xl lg:text-7xl font-bold text-primary-80">
              <span class="text-primary">Unieke totemkledij</span>
            </h1>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold  text-primary-80">
              voor scouts en gidsen
            </h2>

            <div class="space-y-6">
              <p class="text-primary-50 text-base leading-relaxed">
                Laat je persoonlijkheid stralen met een T-shirt of sweater bedrukt met jouw totemdier. 100% ecologisch, lokaal bedrukt én vol trots gedragen door scouts in heel Benelux.
              </p>

              <NuxtLink to="/collectie" class="bg-primary text-primary-foreground px-6 py-4 rounded-full font-medium text-lg w-fit md:text-xl flex items-center gap-2 shadow-lg hover:bg-primary-70 transition-colors">
                Ontdek onze collectie
                <ArrowUpRight class="w-6 h-6" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Image Section -->
      <div class="flex-1 w-full relative mt-10 lg:mt-0">
        <div
          class="w-full h-[400px] md:h-[600px] lg:h-[800px] rounded-2xl md:rounded-3xl bg-cover bg-center relative"
          style="background-image: url('/img/hero.jpg')"
        >
          <!-- Social Proof Badge -->
          <div class="absolute bottom-0 right-0 bg-background rounded-tl-2xl md:rounded-tl-3xl p-3 md:p-4">
            <div class="flex items-center gap-2 md:gap-4">
              <!-- Avatar Group -->
               <div class="flex items-center -space-x-2 md:-space-x-4">
                 <img src="/totems/aap/aap.png" alt="Aap" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-20 object-cover bg-white shadow-lg" />
                 <img src="/totems/aardeekhoorn/aardeekhoorn.png" alt="Aardeekhoorn" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-20 object-cover bg-white shadow-lg" />
                 <img src="/totems/buffel/buffel.png" alt="Buffel" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-20 object-cover bg-white shadow-lg" />
                 <img src="/totems/dolfijn/dolfijn.png" alt="Dolfijn" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-20 object-cover bg-white shadow-lg" />
                 <img src="/totems/schorpioen/schorpioen.png" alt="Schorpioen" class="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-20 object-cover bg-white shadow-lg" />
               </div>

              <!-- Stats -->
              <div class="px-2 md:px-6">
                <div class="text-lg md:text-2xl font-bold text-primary">100+</div>
                <div class="text-primary-50 text-xs md:text-sm">Unieke totemdieren</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

