'use client'
import Section from '@/components/section-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { useFilterQuestions, useHelpDesk } from '@/hooks/settings/use-settings'
import React from 'react'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'

type Props = {
  id: string
}

const FilterQuestions = ({ id }: Props) => {
  const { register, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestions(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Вопросы бота</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Вопрос"
              message="Добавьте вопрос, который вы хотите задать своему чат-боту"
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="question"
              placeholder="Введите свой вопрос"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Ответ на вопрос"
              message="Ответ на поставленный выше вопрос"
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="answered"
              placeholder="Введите свой ответ"
              type="text"
              lines={5}
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Создать
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <p
                key={question.id}
                className="font-bold"
              >
                {question.question}
              </p>
            ))
          ) : (
            <CardDescription>Нет Вопросов</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default FilterQuestions
