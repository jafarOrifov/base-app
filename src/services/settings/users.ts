import api from '@/plugins/axios'
import type { ApiResponse } from '@/types/common'
import type { Users, UsersBean, UsersPayload } from '@/types/settings/users'

export const users = {
  get: async (payload?: UsersPayload) => {
    const res = await api.cash.get<ApiResponse<Users>>('/v1_0/user/for-settings', {
      params: payload,
    })

    return res.data
  },
  fetchGeneratedLoginPassword: async (userId: number | null) => {
    const res = await api.cash.get<{ login: string; password: string }>(
      `/staff/generate-login-password?staff_id=${userId}`,
    )

    return res.data
  },
  createUser: async (payload: UsersBean) => {
    const res = await api.cash.post('/v1_0/user/store', payload)

    return res.data
  },
}
