<script setup lang="ts">
import EditBtn from '@/components/base/EditBtn.vue'
import { useCommonStore } from '@/stores/common'
import { useUsers } from '@/stores/settings/users'
import type { UsersBean } from '@/types/settings/users'
import type { QTable } from 'quasar'
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const AddAndEditDialog = defineAsyncComponent(
  () => import('@/components/settings/users/AddAndEditDialog.vue'),
)
const addAndEditDialogRef = ref<InstanceType<typeof AddAndEditDialog> | null>(null)

const { t } = useI18n()
const store = useUsers()
const commonStore = useCommonStore()

const columns: QTable['columns'] = [
  {
    name: 'id',
    label: t('title.id'),
    field: 'id',
    align: 'left',
  },
  {
    name: 'fullname',
    label: t('table.fio'),
    field: 'fullname',
    align: 'left',
    style: 'font-size: 16px',
  },
  {
    name: 'phone',
    label: t('table.phone'),
    field: 'phone',
    align: 'left',
  },
  {
    name: 'active',
    label: t('table.status'),
    field: 'active',
    align: 'left',
  },
  {
    name: 'last_login',
    label: t('table.loginTime'),
    field: 'last_login',
    align: 'left',
  },
  {
    name: 'actions',
    label: t('title.actions'),
    field: 'actions',
    align: 'center',
  },
]
const inputValue = ref<string>('')
const types = ref([
  { label: t('table.active'), value: true },
  { label: t('table.notActive'), value: false },
])

const showAddDialog = async (row?: UsersBean) => {
  addAndEditDialogRef.value?.showDialog(row)
}
</script>

<template>
  <AddAndEditDialog ref="addAndEditDialogRef" />

  <BaseTable
    :columns="columns"
    :dense="false"
    :storeName="'settings/users'"
    v-model:pagination="store.pagination"
  >
    <template #filters>
      <BaseTextInput
        :label="$t('label.search')"
        v-model="inputValue"
        clearable
        :rule="false"
        @enter="((store.filters.search = inputValue), store.fetchData)"
      />
      <BaseSelectInput
        :label="$t('label.branches')"
        :options="commonStore.branches"
        option-label="organization"
        :rule="false"
        v-model="store.filters.organization_id"
      />
      <BaseSelectInput
        :label="$t('label.type')"
        :options="types"
        option-label="label"
        option-value="value"
        :rule="false"
        v-model="store.filters.active"
      />
    </template>
    <template #actions>
      <BaseBtn icon="mdi-plus" padding="sm" @click="showAddDialog" />
    </template>

    <template #body-cell-active="{ row }">
      <td>
        <q-badge :color="row.active ? 'positive' : 'negative'" outline>
          {{ row.active ? $t('table.active') : $t('table.notActive') }}
        </q-badge>
      </td>
    </template>
    <template #body-cell-actions="{ row }">
      <td>
        <EditBtn @click="showAddDialog(row)" />
      </td>
    </template>
  </BaseTable>
</template>
