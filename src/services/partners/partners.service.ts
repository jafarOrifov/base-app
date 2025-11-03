import api from '@/plugins/axios'
import type { AuthResponse, UserCredentials } from '@/types/auth'

export const partners = {
  get: async (payload: UserCredentials): Promise<string | null> => {
    const res = await api.get<AuthResponse>('/partner', payload)
    return res.data
  },
}
