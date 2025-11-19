import { HTMLAttributes, ReactNode } from 'react'
import { Control } from 'react-hook-form'
import { FormContext, useForm } from '~/components/ui/hooks/form'

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  control?: Control
  children?: ReactNode
}

export default function Form({ control, children }: FormProps) {
  return (
    <FormContext value={control ?? null}>
      <form>{children}</form>
    </FormContext>
  )
}

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode
  name?: string
}

export function FormItem({ children, label }: FormItemProps) {
  return (
    <div className="flex items-center mb-4">
      <label className="whitespace-nowrap mr-3">{label}</label>
      {children}
    </div>
  )
}

Form.useForm = useForm
Form.FormItem = FormItem
