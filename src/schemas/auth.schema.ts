import { ZodType, z } from 'zod'

export type UserRegistrationProps = {
    type: string
    fullname: string
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string
    otp: string
}

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: 'Ваше полное имя должно содержать не менее 4 символов' }),
    email: z.string().email({ message: 'Неправильный формат электронной почты' }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Длина вашего пароля должна составлять не менее 8 символов' })
      .max(64, {
        message: 'Длина вашего пароля не должна превышать 64 символов',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'Пароль должен содержать только буквы и цифры'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'Вы должны ввести 6-значный код' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: 'Ваши Email не совпадают',
    path: ['confirmEmail'],
  })

export type UserLoginProps = {
  email: string
  password: string
}

export type ChangePasswordProps = {
  password: string
  confirmPassword: string
}

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'Вы не указали действительный адрес email' }),
  password: z
    .string()
    .min(8, { message: 'Длина вашего пароля должна составлять не менее 8 символов' })
    .max(64, {
      message: 'Длина вашего пароля не должна превышать 64 символов',
    }),
})

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Длина вашего пароля должна составлять не менее 8 символов' })
      .max(64, {
        message: 'Длина вашего пароля не должна превышать 64 символов',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'пароль должен содержать только буквы и цифры'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'пароли не совпадают',
    path: ['confirmPassword'],
  })