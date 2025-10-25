import { useSession } from 'next-auth/react'
import en from '@/translations/en.json'
import ml from '@/translations/ml.json'

const translations: any = {
  ENGLISH: en,
  MALAYALAM: ml,
  en: en,
  ml: ml,
}

type TranslationKey = string

export function useTranslation() {
  const { data: session } = useSession()
  const userLanguage = (session?.user as any)?.language || 'ENGLISH'
  
  // Convert to translation key
  const language = userLanguage === 'ENGLISH' ? 'ENGLISH' : 'MALAYALAM'

  const t = (key: TranslationKey): string => {
    try {
      const keys = key.split('.')
      let value: any = translations[language]
      
      for (const k of keys) {
        value = value?.[k]
      }
      
      return value || key
    } catch (error) {
      return key
    }
  }

  return { t, language }
}
