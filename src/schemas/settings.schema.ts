import { z } from 'zod'

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2 // 2MB
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

export type DomainSettingsProps = {
  domain?: string
  image?: any
  welcomeMessage?: string
}

export type HelpDeskQuestionsProps = {
  question: string
  answer: string
}

export type AddProductProps = {
  name: string
  image: any
  price: string
}

export type FilterQuestionsProps = {
  question: string
  answered: string
}

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: 'Домен должен содержать не менее 3 символов' })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
      'Это недействительный домен'
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'Размер вашего файла должен быть не более 2 МБ',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'В качестве приемлемых форматов файлов используются только JPG, JPEG и PNG',
    }),
})

export const DomainSettingsSchema = z
  .object({
    domain: z
      .string()
      .min(4, { message: 'Домен должен содержать не менее 3 символов' })
      .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
        'Это недействительный домен'
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, 'Сообщение должно содержать не менее 6 символов')
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .refine(
    (schema) => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true
        }
      }
      if (!schema.image?.length) {
        return true
      }
    },
    {
      message:
        'Объем заполнения должен быть не более 2 МБ, принимаются файлы в форматах PNG, JPEG и JPG',
      path: ['image'],
    }
  )

export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'Вопрос не может быть оставлен пустым' }),
  answer: z.string().min(1, { message: 'Вопрос не может быть оставлен пустым' }),
})

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'Вопрос не может быть оставлен пустым' }),
})

export const AddProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Имя должно содержать не менее 3 символов' }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'Размер вашего файла должен быть не более 2 МБ',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'В качестве приемлемых форматов файлов используются только JPG, JPEG и PNG',
    }),
  price: z.string(), 
})
