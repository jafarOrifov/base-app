<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route)
</script>

<template>
  <div class="row justify-between items-center q-mb-xs">
    <span class="text-subtitle1 text-bold row items-center">
      <q-icon color="orange-10" size="md" name="mdi-bookmark-outline"></q-icon>
      {{ $t(route.meta?.title as string) }}
    </span>
    <q-btn icon="star" size="md" color="orange-10" rounded flat></q-btn>
  </div>
</template>
