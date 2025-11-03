import { date } from 'quasar'

export const dateutil = (() => {
  return date
})()

export const formatPrice = (value: number) => {
  const val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatPhone(tel: string | number | null | undefined): string | null {
  if (!tel) return null
  const digits = String(tel).replace(/\D+/g, '')
  let local: string

  if (digits.length === 12 && digits.startsWith('998')) {
    local = digits.slice(3)
  } else if (digits.length === 11 && digits.startsWith('0')) {
    local = digits.slice(1)
  } else if (digits.length === 9) {
    local = digits
  } else if (digits.length > 9) {
    local = digits.slice(-9)
  } else {
    return null
  }

  return `(${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7, 9)}`
}
