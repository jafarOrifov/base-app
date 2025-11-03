<script setup lang="ts">
const { label, icon } = defineProps<{ label?: string; icon?: string }>()
</script>

<template>
  <q-btn v-bind="$attrs" color="primary" class="row items-center" padding="xs sm">
    <q-icon v-if="icon" :name="icon" size="xs" :class="label ? 'q-mr-xs' : ''"></q-icon>
    {{ label }}
    <slot />
  </q-btn>
</template>
