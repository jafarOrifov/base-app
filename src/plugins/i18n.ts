import { createI18n } from 'vue-i18n'
import uz from '@/locales/uz.json'
import ru from '@/locales/ru.json'

const messages = {
  uz: uz,
  ru: ru,
}

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'uz',
  messages,
})

export default i18n
