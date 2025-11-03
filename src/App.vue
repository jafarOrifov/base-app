<script setup lang="ts">
import i18n from './plugins/i18n'
import { useCommonStore } from './stores/common'
import type { Locales } from './types/common'

const store = useCommonStore()

i18n.global.locale.value = (localStorage.getItem('locale') as Locales) ?? 'uz'
document.body.style.setProperty('--q-primary', store.currentTheme)
</script>

<template>
  <RouterView />
</template>
