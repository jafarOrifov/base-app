<!-- <script setup lang="ts">
import BaseBtn from '@/components/base/BaseBtn.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseTextInput from '@/components/base/BaseTextInput.vue'
import { useProductGroups } from '@/stores/products/productGroups'
import type { ProductGroups } from '@/types/prodcts/productGroups'
import type { QTable } from 'quasar'
import { onMounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useProductGroups()

const columns: QTable['columns'] = [
  {
    name: 'id',
    label: t('title.id'),
    field: 'id',
    align: 'left',
  },
  {
    name: 'title',
    label: t('title.name'),
    field: 'title',
    align: 'left',
  },
  {
    name: 'is_collaboration',
    label: t('title.name'),
    field: 'is_collaboration',
    align: 'left',
  },
  {
    name: 'actions',
    label: t('title.actions'),
    field: 'actions',
    align: 'left',
  },
]
const data = shallowRef<ProductGroups[]>([])

onMounted(async () => {
  data.value = await store.fetchProductGroups({ search: '', page: 1 })
})
</script>-->

<template>
  <div>Salomlar</div>
</template>
