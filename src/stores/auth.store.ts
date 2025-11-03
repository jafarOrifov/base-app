import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/services/auth.service'
import type { UserCredentials } from '@/types/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const router = useRouter()

  async function login(payload: UserCredentials) {
    try {
      token.value = await auth.login(payload)
      localStorage.setItem('token', token.value ?? '')

      if (token.value) router.push('/')
    } catch (e) {
      throw e
    }
  }

  return { login }
})
