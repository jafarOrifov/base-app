import i18n from '@/plugins/i18n'
import { Notify } from 'quasar'

const errorMessage = (msg?: string) => {
  Notify.create({
    message: msg || i18n.global.t('label.errorMsg'),
    type: 'negative',
    position: 'top-right',
  })
}

const successMessage = (msg?: string) => {
  Notify.create({
    message: msg || i18n.global.t('label.successMsg'),
    position: 'top-right',
    type: 'positive',
  })
}

const warningMessage = (msg?: string) => {
  Notify.create({
    message: msg || i18n.global.t('label.errorMsg'),
    position: 'top-right',
    type: 'warning',
  })
}
export { errorMessage, successMessage, warningMessage }
