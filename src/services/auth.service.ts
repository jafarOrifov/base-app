import api from '@/plugins/axios'
import type { AuthResponse, UserCredentials } from '@/types/auth'

export const auth = {
  login: async (payload: UserCredentials): Promise<string | null> => {
    try {
      const res = await api.cash.post<AuthResponse>('/sign-in', payload)
      return res.data.token
    } catch (e) {
      throw e
    }
  },
}
