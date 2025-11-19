import { zodResolver } from '@hookform/resolvers/zod'
import { createContext } from 'react'
import { Control, FieldValues, useForm as useForm_, UseFormProps } from 'react-hook-form'
import { z } from 'zod'

export interface UseFormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> extends Omit<UseFormProps<TFieldValues, TContext, TTransformedValues>, 'resolver'> {
  schema?: z.ZodSchema<TFieldValues, z.ZodTypeDef, TTransformedValues>
}

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  schema,
  ...rest
}: UseFormOptions<TFieldValues, TContext, TTransformedValues>) => {
  const form = useForm_<TFieldValues, TContext, TTransformedValues>({
    ...rest,
    /// TODO 寻找更好的解决类型错误的方法
    // @ts-ignore
    resolver: schema && zodResolver(schema),
  })
  return form.control
}

export const FormContext = createContext<Control | null>(null)

export const FormItemContext = createContext<Control | null>(null)
