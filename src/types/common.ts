/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QTable } from 'quasar'

export interface ApiResponse<T> {
  data: T[]
  links: unknown
  meta: {
    current_page: number
    from: number
    last_page: number
    links: [{ url: null; label: string; active: boolean }]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface Pagination {
  sortBy?: string | null
  descending?: boolean
  page?: number
  rowsPerPage?: number
  rowsNumber?: number
}

export type Locales = 'uz' | 'ru'

export interface Languages {
  locale: Locales
  label: string
}

export interface CommonPayload {
  page?: number
  search?: string
  organization_id?: number
}

export type BaseStore = {
  rows: any[]
  loading?: boolean
  pagination?: Record<string, string | number>
  fetchData?: (params?: any) => Promise<void> | void
  onRequest?: (params: QTable['pagination']) => Promise<void> | void
  filters: any
  rowKey: string
}

export interface Branches {
  id: number
  organization: string
  territory: { id: number; title: string }
  territory_id: number
}

interface FavoritePages {
  icon: string
  path: string
  title: string
  user_id: number
}

export interface User {
  active: boolean
  favorite_pages: FavoritePages[]
  fullname: string
  id: number
  last_login: string
  office: boolean
  organization: string
  organization_id: number
  organization_myid: boolean
  organization_print_name: string
  organization_questionnaire: boolean
  phone: string
  position: string
  position_id: number
  practice_day: { id: number; date: string }
  practice_month: {
    id: number
    year: number
    month: number
    started: string
    finished: null | number
    organization_id: number
  }
  rules: Record<string, any>
  settings: null | number
  username: string
}

export interface Territories {
  active: boolean
  id: number
  title: string
}

export interface Positions {
  id: number
  position: string
}

export interface Staffs {
  fio: string
  id: number
  telephone_number: string
  user: null | string
  user_position: { id: number; position: string }
  user_position_id: number
}
