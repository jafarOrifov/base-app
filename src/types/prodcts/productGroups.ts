export interface ProductGroups {
  active: boolean
  created_at: Date
  id: number
  is_collaboration: boolean
  key: string | null
  title: string
  updated_at: Date
}

export interface ProductGroupsPayload {
  search: string
  page: number
}
