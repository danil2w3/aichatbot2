import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { USER_REGISTRATION_FORM } from '@/constants/forms'
import FormGenerator from '../form-generator'

type Props = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

function AccountDetailsForm({ errors, register }: Props) {
  return (
    <>
      <h2 className="text-gravel md:text-3xl font-bold">Создать аккаунт</h2>
      <p className="text-iridium md:text-sm">Введите свой адрес электронной почты и пароль</p>
      {USER_REGISTRATION_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
      
    </>
  )
}

export default AccountDetailsForm
