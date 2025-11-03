import type { Pagination } from '../common'

export interface Users {
  active: boolean
  collaboration: boolean
  consultant: { id: number; full_name: string; user_id: number }
  fullname: string
  id: number
  last_login: string
  organization: { id: number; organization: string }
  organization_id: number
  phone: string
  position: { id: number }
  position_id: number
  staff: { id: number; fio: string }
  staff_id: number
  territory: { id: number; title: string }
  territory_id: number
  username: string
}

export interface UserFilters {
  search: string
  organization_id: null | number
  active: null | boolean
}

export interface UsersPayload extends Pagination {
  search: string | null
  active: boolean | null
  organization_id: number | null
}

export interface UsersBean {
  id: null | number
  collaboration: boolean
  consultant_password: string
  is_consultant: boolean
  organization_id: number | null
  password: string
  phone: string
  position_id: number | null
  staff_id: number | null
  territory_id: number | null
  username: string
}
