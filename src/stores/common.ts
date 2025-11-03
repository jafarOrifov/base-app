import i18n from '@/plugins/i18n'
import { common } from '@/services/common.service'
import type {
  Branches,
  Languages,
  Locales,
  Positions,
  Staffs,
  Territories,
  User,
} from '@/types/common'
import { defineStore } from 'pinia'
import { reactive, shallowRef } from 'vue'

export const useCommonStore = defineStore('', () => {
  const languages = reactive<Languages[]>([
    { locale: 'uz', label: "O'zbek" },
    { locale: 'ru', label: 'Русский' },
  ])

  const currentLocale = (localStorage.getItem('locale') as Locales) || 'uz'
  const currentTheme = localStorage.getItem('theme') as string
  const branches = shallowRef<Branches[]>([])
  const user = shallowRef<User[]>([])
  const territories = shallowRef<Territories[]>([])
  const positions = shallowRef<Positions[]>([])
  const staffs = shallowRef<Staffs[]>([])

  function setLocale(locale: Locales) {
    if (locale) {
      i18n.global.locale.value = locale
      localStorage.setItem('locale', locale)
    }
  }

  function chengeTheme(color: string) {
    localStorage.setItem('theme', color)
  }

  async function getBranches() {
    try {
      if (branches.value.length) return

      const res = await common.fetchBranches()
      branches.value = res.data
    } finally {
    }
  }

  async function getUser() {
    try {
      if (user.value.length) return

      const res = await common.fetchUser()
      user.value = res.data
    } finally {
    }
  }

  async function getTerritories() {
    try {
      if (territories.value.length) return

      const res = await common.fetchTerritories()
      territories.value = res.data
    } finally {
    }
  }

  async function getPositoins() {
    try {
      if (positions.value.length) return

      const res = await common.fetchPositions()
      positions.value = res.data
    } finally {
    }
  }

  async function getStaffs() {
    try {
      if (staffs.value.length) return

      const res = await common.fetchStaffs()
      staffs.value = res.data
    } finally {
    }
  }

  return {
    languages,
    currentLocale,
    currentTheme,
    branches,
    territories,
    positions,
    staffs,
    setLocale,
    chengeTheme,
    getBranches,
    getUser,
    getTerritories,
    getPositoins,
    getStaffs,
  }
})
