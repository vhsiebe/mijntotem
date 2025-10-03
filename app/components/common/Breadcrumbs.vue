<template>
  <nav class="text-sm text-gray-60" aria-label="Breadcrumb">
    <ol class="flex items-center flex-wrap gap-2">
      <li v-for="(item, idx) in items" :key="idx" class="flex items-center">
        <template v-if="item.to && idx < items.length - 1">
          <NuxtLink :to="item.to" class="hover:text-primary">{{ item.label }}</NuxtLink>
          <span class="mx-2">/</span>
        </template>
        <template v-else>
          <span class="text-gray-90">{{ item.label }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface Crumb { label: string; to?: string }

defineProps<{ items: Crumb[] }>()
</script>
