import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { Pagination } from '@/types/common'
import { users } from '@/services/settings/users'
import type { Users, UsersPayload } from '@/types/settings/users'

export const useUsers = defineStore('users', () => {
  const loading = ref<boolean>(false)
  const rows = shallowRef<Users[]>([])
  const pagination = ref<Pagination>({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: 10,
    sortBy: 'id',
    descending: false,
  })
  const filters = ref<UsersPayload>({
    search: null,
    organization_id: null,
    active: null,
  })

  function onRequest({
    pagination: item,
    filter,
    force = false,
  }: {
    pagination: Pagination
    filter: UsersPayload
    force: boolean
  }) {
    if (rows.value.length && force) return

    pagination.value.page = item.page
    fetchData({ ...item, ...filter })
  }

  async function fetchData(payload?: UsersPayload) {
    try {
      loading.value = true
      const res = await users.get(payload)
      pagination.value.rowsNumber = res.meta.total
      rows.value = res.data
      return res.data
    } finally {
      loading.value = false
    }
  }

  return { loading, pagination, rows, filters, onRequest, fetchData }
})
