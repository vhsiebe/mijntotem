<template>
  <NuxtLayout>
      <div class="min-h-screen flex items-center justify-center px-5">
    <div class="max-w-2xl mx-auto text-center">
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-9xl md:text-[12rem] font-bold text-primary-80 leading-none">
          404
        </h1>
        <div class="w-24 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      <!-- Error Message -->
      <div class="mb-12">
        <h2 class="text-3xl md:text-4xl font-semibold text-primary mb-4">
          Oeps! Pagina niet gevonden
        </h2>
        <p class="text-lg text-gray-60 leading-relaxed">
          De pagina die je zoekt bestaat niet of is verplaatst. 
          Laten we je helpen om terug te vinden wat je zoekt.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <NuxtLink 
          to="/" 
          class="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary-80 transition-colors"
        >
          Terug naar Home
        </NuxtLink>
        <NuxtLink 
          to="/collectie" 
          class="border-2 border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Bekijk Collectie
        </NuxtLink>
      </div>

      <!-- Helpful Links -->
      <div class="bg-gray-10 rounded-2xl p-8">
        <h3 class="text-xl font-semibold text-primary mb-6">
          Misschien zoek je naar:
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink 
            to="/totems" 
            class="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-20 transition-colors group"
          >
            <div class="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Home class="w-5 h-5" />
            </div>
            <div class="text-left">
              <div class="font-medium text-primary">Totems</div>
              <div class="text-sm text-gray-60">Bekijk onze collectie</div>
            </div>
          </NuxtLink>
          
          <NuxtLink 
            to="/over-ons" 
            class="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-20 transition-colors group"
          >
            <div class="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Users class="w-5 h-5" />
            </div>
            <div class="text-left">
              <div class="font-medium text-primary">Over ons</div>
              <div class="text-sm text-gray-60">Leer meer over MijnTotem</div>
            </div>
          </NuxtLink>
          
          <NuxtLink 
            to="/faq" 
            class="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-20 transition-colors group"
          >
            <div class="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <HelpCircle class="w-5 h-5" />
            </div>
            <div class="text-left">
              <div class="font-medium text-primary">FAQ</div>
              <div class="text-sm text-gray-60">Veelgestelde vragen</div>
            </div>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-20 transition-colors group"
          >
            <div class="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail class="w-5 h-5" />
            </div>
            <div class="text-left">
              <div class="font-medium text-primary">Contact</div>
              <div class="text-sm text-gray-60">Neem contact op</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Home, Users, HelpCircle, Mail, Search } from 'lucide-vue-next'

// Set page title and meta
useHead({
  title: '404 - Pagina niet gevonden | MijnTotem',
  meta: [
    { name: 'description', content: 'De pagina die je zoekt bestaat niet. Ga terug naar de homepage of bekijk onze collectie totems.' }
  ]
})
</script>

<style scoped>
/* Custom animations for the 404 number */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
</style>