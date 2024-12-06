import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
  register: UseFormRegister<FieldValues>
  userType: 'owner' | 'student'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-3xl font-bold">Создать учетную запись</h2>
      <p className="text-iridium md:text-sm">
      Расскажите нам о себе! Чем вы заниметесь? Давайте адаптируем ваш опыт таким образом, чтобы он наилучшим образом подходил вам.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="У меня свой бизнес"
        text="Создаю свою учетную запись для своей компании."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="Я студент"
        text="Хочу побольше узнать об этом инструменте."
      />
    </>
   )
}

export default TypeSelectionForm
