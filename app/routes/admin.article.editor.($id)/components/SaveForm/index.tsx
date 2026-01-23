import { useRequest } from 'ahooks'
import { useState } from 'react'
import Form, { FormItem } from '~/components/ui/Form'
import Select, { SelectOption } from '~/components/ui/Select'
import { supabaseClient } from '~/utils/supabase'

export interface SaveFormProps {}

export default function SaveForm(_: SaveFormProps) {
  const [filerCategoryOptions, setFilersCategoryOptions] = useState<SelectOption[]>([])
  const [filterColumnsOptions, setFilterColumnsOptions] = useState<SelectOption[]>([])

  const { data: categoryOptions = [] } = useRequest(async () => {
    const { error, data } = await supabaseClient.from('categorys').select()
    if (error) {
      return
    }
    const optios = data.map((e) => ({
      label: e.name,
      value: e.id,
    }))

    setFilersCategoryOptions(optios)

    return optios
  })

  const { data: columnsOptions = [] } = useRequest(async () => {
    const { error, data } = await supabaseClient.from('columns').select()
    if (error) {
      return
    }
    const optios = data.map((e) => ({
      label: e.name,
      value: e.id,
    }))

    setFilterColumnsOptions(optios)

    return optios
  })

  return (
    <Form>
      <FormItem label="分类:">
        <Select
          name="category"
          options={filerCategoryOptions}
          search={(v) => {
            setFilersCategoryOptions(
              v ? categoryOptions.filter((e) => e.label.includes(v)) : categoryOptions
            )
          }}
          placeholder="选择分类"
          block
        />
      </FormItem>
      <FormItem label="专栏:">
        <Select
          name="co"
          options={filterColumnsOptions}
          search={(v) => {
            setFilterColumnsOptions(
              v ? columnsOptions.filter((e) => e.label.includes(v)) : columnsOptions
            )
          }}
          placeholder="选择专栏"
          block
        />
      </FormItem>
    </Form>
  )
}
