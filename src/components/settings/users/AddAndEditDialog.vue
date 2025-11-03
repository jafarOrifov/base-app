<script setup lang="ts">
import { successMessage } from '@/composables/useNotify'
import { users } from '@/services/settings/users'
import { useCommonStore } from '@/stores/common'
import { useUsers } from '@/stores/settings/users'
import type { UsersBean } from '@/types/settings/users'
import { ref } from 'vue'

const commonStore = useCommonStore()
const store = useUsers()

const dialog = ref<boolean>(false)
const beanDefault = ref<UsersBean>({
  id: null,
  collaboration: false,
  consultant_password: '',
  is_consultant: false,
  organization_id: null,
  password: '',
  phone: '',
  position_id: null,
  staff_id: null,
  territory_id: null,
  username: '',
})

const bean = ref<UsersBean>({ ...beanDefault.value })

const showDialog = async (row?: UsersBean) => {
  bean.value = row?.id ? { ...row } : { ...beanDefault.value }
  dialog.value = true
}

const getGeneratedLoginPassword = async (val: number) => {
  try {
    const res = await users.fetchGeneratedLoginPassword(val)
    bean.value.username = res.login
    bean.value.password = res.password
  } finally {
  }
}

const submit = async () => {
  try {
    await users.createUser(bean.value)
    dialog.value = false
    successMessage()
    store.fetchData()
  } finally {
  }
}

defineExpose({
  showDialog,
})
</script>

<template>
  <BaseDialog v-model="dialog" @save="submit">
    <div class="row items-center q-gutter-sm">
      <BaseSelectInput
        class="col"
        v-model="bean.organization_id"
        :label="$t('label.branches')"
        :options="commonStore.branches"
        option-label="organization"
        multiple
      />
      <BaseSelectInput
        class="col"
        v-model="bean.territory_id"
        :label="$t('label.territory')"
        :options="commonStore.territories"
        option-label="title"
      />
      <BaseSelectInput
        class="col"
        v-model="bean.staff_id"
        :label="$t('table.fio')"
        :options="commonStore.staffs"
        option-label="fio"
        @update:model-value="getGeneratedLoginPassword"
      />
      <BaseSelectInput
        class="col"
        v-model="bean.position_id"
        :label="$t('table.position')"
        :options="commonStore.positions"
        option-label="position"
      />
      <BaseTextInput class="col" v-model="bean.username" readonly :label="$t('label.login')" />
      <BaseTextInput class="col" v-model="bean.password" readonly :label="$t('label.password')" />
      <BaseTextInput
        class="col-12"
        v-model="bean.phone"
        :label="$t('table.phone')"
        prefix="+998"
        mask="(##) ###-##-##"
      />
      <div class="row q-gutter-xl">
        <q-checkbox v-model="bean.is_consultant" :label="$t('table.consultant')"></q-checkbox>
        <q-checkbox v-model="bean.collaboration" :label="$t('table.colobration')"></q-checkbox>
      </div>
    </div>
  </BaseDialog>
</template>
