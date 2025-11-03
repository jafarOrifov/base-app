import api from '@/plugins/axios'
import type { ApiResponse } from '@/types/common'
import type { ProductGroups, ProductGroupsPayload } from '@/types/prodcts/productGroups'

export const productGroups = {
  get: async (payload: ProductGroupsPayload) => {
    const res = await api.get<ApiResponse<ProductGroups>>('/devices', {
      params: payload,
    })

    return res.data
  },
}
