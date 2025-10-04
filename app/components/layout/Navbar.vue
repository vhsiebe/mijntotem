<script setup>
import { ChevronDown, Search, ShoppingCart, Menu } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)

const route = useRoute()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="w-full bg-accent sticky top-0 lg:bg-transparent z-50">
    <div class="hidden lg:block w-full bg-black/10 blur-xl h-3 "></div>
    <div class="px-5 md:px-10">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/">
          <img src="/logo.svg" alt="MijnTotem Logo" class="h-12 p-1 w-auto md:h-16 lg:hidden" />
        </NuxtLink>
        <!-- Logo -->
        <!-- Desktop Navigation (hidden on mobile) -->
        <div
          class="hidden lg:flex items-center flex-1 bg-accent rounded-full px-5 py-2 mx-auto mt-4 xl:max-w-screen-2xl">

          <NuxtLink to="/">
            <img src="/logo.svg" alt="MijnTotem Logo" class="h-8 w-auto md:h-16 hidden lg:block" />
          </NuxtLink>
          <!-- Navigation Links -->
          <div class="flex items-center bg-background rounded-full px-2 py-2 mx-auto">
            <NuxtLink :class="{ 'bg-primary text-primary-foreground': route.path === '/' }" to="/"
              class="text-primary-40 px-4 py-2 rounded-full font-medium text-sm transition-colors hover:text-primary">
              Home
            </NuxtLink>
            <div class="relative group">
              <button
                class="px-4 py-2 text-primary-40 font-medium text-sm flex items-center gap-1 transition-colors hover:text-primary">
                Shop
                <ChevronDown class="w-4 h-4" />
              </button>
              <!-- Dropdown Menu -->
              <div
                class="absolute top-full left-0 mt-4 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/collectie"
                    class="block px-4 py-2 text-sm text-primary-40 hover:text-primary hover:bg-primary hover:text-white transition-colors">
                    Collectie
                  </NuxtLink>
                  <NuxtLink to="/totems"
                    class="block px-4 py-2 text-sm text-primary-40 hover:text-primary hover:bg-primary hover:text-white transition-colors">
                    Totems
                  </NuxtLink>
                </div>
              </div>
            </div>
            <NuxtLink to="/over-ons"
              class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors hover:text-primary">
              Over ons
            </NuxtLink>
            <NuxtLink to="/faq"
              class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors hover:text-primary">
              FAQ
            </NuxtLink>
            <NuxtLink to="/contact"
              class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors hover:text-primary">
              Contact
            </NuxtLink>
          </div>

          <div class="hidden lg:flex items-center gap-10 ml-10">
            <!-- Search -->

            <div class="ml-10 w-30 flex items-center">
              <ClientOnly>
                <CartDropdown />
              </ClientOnly>
            </div>
            <!-- Cart -->
          </div>

        </div>

        <!-- Desktop Search and Cart (hidden on mobile) -->

        <!-- Mobile Actions -->
        <div class="flex items-center gap-6 lg:hidden">
          <ClientOnly>
            <CartDropdown />
          </ClientOnly>
          <!-- Mobile Menu Button -->
          <button class="p-1" @click="toggleMobileMenu">
            <Menu class="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu (hidden by default) -->
      <div v-show="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-2 right-2 bg-white rounded-lg p-4 shadow-lg z-50" :style="{
          marginBottom: '2rem',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'all 0.3s ease-out'
        }">
        <div class="flex flex-col space-y-4">
          <NuxtLink to="/" class="px-4 py-2 text-primary font-medium text-sm transition-colors"
            @click="closeMobileMenu">
            Home
          </NuxtLink>
          <NuxtLink to="/collectie" class="px-4 py-2 text-primary-40 font-medium text-sm text-left"
            @click="closeMobileMenu">
            Shop
          </NuxtLink>
          <NuxtLink to="/totems" class="px-4 py-2 text-primary-40 font-medium text-sm text-left"
            @click="closeMobileMenu">
            Totems
          </NuxtLink>
          <NuxtLink to="/over-ons" class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors"
            @click="closeMobileMenu">
            Over ons
          </NuxtLink>
          <NuxtLink to="/faq" class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors"
            @click="closeMobileMenu">
            FAQ
          </NuxtLink>
          <NuxtLink to="/contact" class="px-4 py-2 text-primary-40 font-medium text-sm transition-colors"
            @click="closeMobileMenu">
            Contact
          </NuxtLink>

        </div>
      </div>
    </div>
  </nav>
</template>