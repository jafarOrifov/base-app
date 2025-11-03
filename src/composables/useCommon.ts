import { useI18n } from 'vue-i18n'

export default function useFormRules() {
  const { t } = useI18n()
  return {
    required:
      (message = '') =>
      (val: string) => {
        return !!val || message || "Bu maydon to'ldirilishi shart"
      },
    requiredNull:
      (message = '') =>
      (val: string) => {
        return val !== null || message || "Bu maydon to'ldirilishi shart"
      },
    min:
      (length: number, message = '') =>
      (val: string) => {
        return (
          val.length >= length ||
          message ||
          `Bu maydon kamida ${length} ta belgidan iborat bo\'lishi kerak`
        )
      },
    max:
      (length: number, message = '') =>
      (val: string) => {
        return (
          val.length <= length ||
          message ||
          `Bu maydon ko'pi bilan ${length}ta belgidan iborat bo'lishi mumkin`
        )
      },
    minHundred:
      (length?: number, message = '') =>
      (val: string) => {
        return (
          Number(val) > 99999 ||
          message ||
          "Bu maydonning qiymati kamida 100 000 ga teng bo'lishi kerak!"
        )
      },
    maxHundred:
      (length?: number, message = '') =>
      (val: string) => {
        return (
          Number(val) <= 100 ||
          message ||
          "Bu maydonning qiymati 100 dan katta bo'lishi mumkin emas!"
        )
      },
    maxFiveHundred:
      (length?: number, message = '') =>
      (val: string) => {
        return (
          Number(val) <= 500 ||
          message ||
          "Bu maydonning qiymati 500 dan katta bo'lishi mumkin emas!"
        )
      },
    minMax:
      (min: number, max: number, message = '') =>
      (val: string) => {
        return (
          Number(val) <= 10 ||
          message ||
          "Bu maydonning qiymati kamida 100 000 ga teng bo'lishi kerak!"
        )
      },
    notNol:
      (length?: number, message = '') =>
      (val: string) => {
        return Number(val) > 0 || message || "Bu maydon 0 dan katta qiymatda bo'lishi kerak"
      },
    // minDate:
    //   (date: Date, message = '') =>
    //   (val: string) => {
    //     return val.date > date || message || "Bu maydon 0 dan katta qiymatda bo'lishi kerak"
    //   },
    isEqual: (message: string, comparingValue: string) => (val: string) => {
      return val === comparingValue || message || "Bu maydon to'ldirishi shart"
    },
    atLeastNol: (message?: string) => (val: string) => {
      return val !== '' || message || "Bu maydonning qiymati kamida 0 ga teng bo'lishi shart! "
    },
    notMinus:
      (length?: number, message = '') =>
      (val: string) => {
        return Number(val) >= 0 || message || "Bu maydon musbat son bo'lishi kerak"
      },
    isEmpty:
      (message = '') =>
      (val: string) => {
        return !!val.length || message || "Bu maydon to'ldirilishi shart"
      },
    checkFormatPhoneNumber: (comparingValue: string) => (val: string) => {
      return val.slice(0, 3) === comparingValue || t('validation.phone_country_code_incorrect')
    },
    checkLengthPhoneNumber: (length: number) => (val: string) => {
      return val.length === length || t('validation.enter_your_full_phone_number')
    },
    hasLowerCase(val: string) {
      return /[a-z]/.test(val) || t('validation.has_lower_case')
    },
    hasUpperCase(val: string) {
      return /[A-Z]/.test(val) || t('validation.has_upper_case')
    },
    hasNumber(val: string) {
      return /[0-9]/.test(val) || t('validation.has_number')
    },
    hasSpecialChar(val: string) {
      return /[!@#$%^&*(),.?":{}|<>]/.test(val) || t('validation.has_special_char')
    },
  }
}
