import { ZodType, z } from 'zod'

type EmailMarketingProps = {
  name: string
}

type EmailMarketingBodyProps = {
  description: string
}

export const EmailMarketingSchema: ZodType<EmailMarketingProps> = z.object({
  name: z
    .string()
    .min(3, { message: 'Название кампании должно содержать не менее 3 символов' }),
})

export const EmailMarketingBodySchema: ZodType<EmailMarketingBodyProps> =
  z.object({
    description: z
      .string()
      .min(1, { message: 'Текст должен содержать не менее 1 символов' }),
  })
