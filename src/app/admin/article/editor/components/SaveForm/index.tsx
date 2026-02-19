import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import SingleImageUpload from '~/components/SingleImageUpload'
import { supabaseClient } from '~/utils/supabase'
import { Tables } from '~/types/supabase'

const articleInfoSchema = z.object({
  category_id: z.number().optional(),
  column_ids: z.array(z.number()).optional(),
  describe: z.string().optional(),
  cover: z.string().optional(),
})

export type ArticleInfo = z.infer<typeof articleInfoSchema>

type FormArticle = Partial<Pick<Tables<'articles'>, 'title' | 'category_id' | 'describe' | 'cover'>>

export interface SaveFormProps {
  onSubmit: (articleInfo: ArticleInfo) => void
  onClose: () => void
  saving?: boolean
  article?: FormArticle & {
    article_columns?: Pick<Tables<'article_columns'>, 'column_id' | 'article_id'>[]
  }
}

export default function SaveForm({ onSubmit, onClose, article, saving }: SaveFormProps) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...article,
      category_id: article?.category_id ?? undefined,
      column_ids: article?.article_columns?.map((e) => e.column_id),
    },
    resolver: zodResolver(articleInfoSchema),
  })

  const { isFetched: isCategorysFetched, data: categoryOptions = [] } = useQuery({
    queryKey: ['categorys'],
    queryFn: async () => {
      const { error, data } = await supabaseClient.from('categorys').select()
      if (error) {
        return
      }
      return data
    },
  })

  const { isFetched: isColumnsFetched, data: columnsOptions = [] } = useQuery({
    queryKey: ['columns'],
    queryFn: async () => {
      const { error, data } = await supabaseClient.from('columns').select()
      if (error) {
        return
      }

      return data
    },
  })

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-120">
      <div className="ellipsis">准备上传文章: {article?.title}</div>
      <FormControl fullWidth>
        <TextField
          label="简介"
          placeholder="输入文章简介"
          multiline
          minRows={3}
          maxRows={8}
          {...register('describe')}
        />
      </FormControl>
      <div className="flex gap-4">
        <FormControl fullWidth>
          <InputLabel id="category-label">分类</InputLabel>
          <Controller
            control={control}
            name="category_id"
            render={({ field }) => (
              <Select<number | undefined>
                {...field}
                label="分类"
                labelId="category-label"
                disabled={!isCategorysFetched}
                startAdornment={
                  isCategorysFetched ? undefined : (
                    <div className="flex items-center">
                      <CircularProgress size="1.75rem" />
                    </div>
                  )
                }
                {...register('category_id')}
              >
                <MenuItem value={undefined}>
                  <span className="italic">暂不选择</span>
                </MenuItem>
                {categoryOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="column-label">专栏</InputLabel>
          <Controller
            control={control}
            name="column_ids"
            render={({ field }) => (
              <Select<number[]>
                {...field}
                label="专栏"
                labelId="column-label"
                disabled={!isColumnsFetched}
                startAdornment={
                  isColumnsFetched ? undefined : (
                    <div className="flex items-center">
                      <CircularProgress size="1.75rem" />
                    </div>
                  )
                }
                defaultValue={[]}
                multiple
                {...register('column_ids')}
              >
                {columnsOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </div>
      <Controller
        control={control}
        name="cover"
        render={({ field }) => (
          <SingleImageUpload {...field} className="w-1/2 m-auto" bucket="cover" />
        )}
      />
      <div className="flex gap-4">
        <Button className="flex-1" type="submit" variant="contained" loading={saving}>
          保存
        </Button>
        <Button className="flex-1" variant="outlined" onClick={onClose}>
          取消
        </Button>
      </div>
    </form>
  )
}
