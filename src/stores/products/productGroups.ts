import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductGroupsPayload } from '@/types/prodcts/productGroups'
import { productGroups } from '@/services/products/productGroups'

export const useProductGroups = defineStore('product-groups', () => {
  const loading = ref<boolean>(false)

  async function fetchProductGroups(payload: ProductGroupsPayload) {
    try {
      loading.value = true
      const res = await productGroups.get(payload)
      return res.data
    } catch (e) {
      throw e
    } finally {
      loading.value = false
    }
  }

  return { fetchProductGroups, loading }
})
