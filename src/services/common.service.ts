import api from '@/plugins/axios'
import type { ApiResponse, Branches, Positions, Staffs, Territories, User } from '@/types/common'

export const common = {
  fetchBranches: async () => {
    const res = await api.client.get<ApiResponse<Branches>>('/organizations')

    return res.data
  },
  fetchUser: async () => {
    const res = await api.cash.post<ApiResponse<User>>('/v1_0/user')

    return res.data
  },
  fetchTerritories: async () => {
    const res = await api.cash.get<ApiResponse<Territories>>('/v1_0/get_all_territories')

    return res.data
  },
  fetchPositions: async () => {
    const res = await api.cash.get<ApiResponse<Positions>>('/v1_0/get_all_user_positions')

    return res.data
  },
  fetchStaffs: async () => {
    const res = await api.cash.get<ApiResponse<Staffs>>('/staffs')

    return res.data
  },
}
