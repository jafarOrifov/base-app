<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts" generic="T, F">
import type { BaseStore } from '@/types/common'
import { QTable } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseBtn from './BaseBtn.vue'

interface PropsType {
  columns: QTable['columns']
  storeName: string
}
const store = ref<BaseStore>()
const { columns, storeName } = defineProps<PropsType>()
const { t } = useI18n()

onMounted(async () => {
  const modulePath = `../../stores/${storeName}`
  const module = await import(modulePath)

  const useStore = Object.values(module).find(
    (exp: any) => typeof exp === 'function' && exp.name.startsWith('use'),
  ) as any

  if (!useStore) {
    console.error(`Store ${storeName} topilmadi`)
    return
  }

  store.value = useStore()
  // await store.value?.fetchData?.()
})
</script>

<template>
  <QTable
    class="my-sticky-header-table"
    flat
    :grid="$q.screen.lt.md"
    bordered
    dense
    :rows="store?.rows ?? []"
    :columns="columns"
    row-key="index"
    style="height: calc(100vh - 110px)"
    :loading="store?.loading"
    :filter="store?.filters"
    table-header-style="height: auto"
    v-bind="$attrs"
    :rows-per-page-options="[0]"
    @request="store?.onRequest as Function"
  >
    <template #no-data v-if="store?.rows.length">
      <div align="center" style="height: 600px !important; width: 100%">
        <div class="row q-gutter-sm justify-center items-center">
          <div>
            <q-icon name="mdi-database-search-outline" class="text-grey text-h3" />
          </div>
          <h1 class="text-h5 text-grey">{{ t('label.noData') }}</h1>
        </div>
      </div>
    </template>
    <template #top>
      <div class="full-width row items-center justify-between q-gutter-x-xs">
        <slot name="filters"></slot>
        <q-space />
        <slot name="actions"></slot>
        <BaseBtn icon="mdi-refresh" padding="sm" @click="store?.fetchData">
          <q-tooltip class="bg-primary">{{ $t('label.refresh') }}</q-tooltip>
        </BaseBtn>
      </div>
    </template>
    <template v-for="col in columns" :key="col.name" v-slot:[`body-cell-${col.name}`]="slotProps">
      <slot :name="`body-cell-${col.name}`" v-bind="slotProps">
        <!-- Default render (agar slot berilmagan bo‘lsa) -->
        <q-td :props="slotProps">
          {{ slotProps.row[col.field as string] }}
        </q-td>
      </slot>
    </template>
  </QTable>
</template>

<style lang="scss">
.q-table--loading thead tr:last-child th {
  position: sticky;
  top: 35px;
  z-index: 4;
}
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background: #e2f8e7;
  position: sticky;
  z-index: 2;
}
thead tr:first-child th {
  top: 0;
}

td:last-child {
  background-color: rgba(162, 220, 167, 0.3);
}

tr th {
  position: sticky;
  z-index: 2;
  background: #00b4ff;
}

thead tr:last-child th {
  top: 48px;
  z-index: 3;
}
thead tr:first-child th {
  top: 0;
  z-index: 1;
}
tr:last-child th:last-child {
  z-index: 3;
}

td:last-child {
  z-index: 1;
  text-align: center;
}

td:last-child,
th:last-child {
  position: sticky;
  right: 0;
}

tbody {
  scroll-margin-top: 48px;
}
</style>
