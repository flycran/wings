import { zodResolver } from '@hookform/resolvers/zod'
import SaveIcon from '@mui/icons-material/Save'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
import AdminPageHeadModule from '~/components/AdminModule/AdminPageHeadModule'
import { CarouselData, SlotsData } from '~/server/home'
import { supabaseClient } from '~/utils/supabase'
import { CarouselItem, SlotItem } from '../../../types/supabase.additional'
import CarouselManager from './components/CarouselManager'
import SlotsManager from './components/SlotsManager'

const carouselItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, '标题不能为空'),
  cover: z.string().min(1, '图片不能为空'),
  color: z.string().min(1, '颜色不能为空'),
  link: z.string().optional(),
})

const slotItemSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  cover: z.string().min(1, '图片不能为空'),
  link: z.string().optional(),
})

const homeConfigSchema = z.object({
  carousel: z.array(carouselItemSchema),
  slots: z.array(slotItemSchema),
})

export type HomeConfig = {
  carousel: CarouselItem[]
  slots: SlotItem[]
}

export default function AdminHome() {
  const {
    data: config,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['homepage-singleton'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('homepage_singleton')
        .select('*')
        .eq('id', 1)
        .single()
      if (error) throw error
      return {
        carousel: (data.carousel as unknown as CarouselData[]) || [],
        slots: (data.slots as unknown as SlotsData[]) || [
          { title: '', cover: '', link: '' },
          { title: '', cover: '', link: '' },
        ],
      }
    },
  })

  const methods = useForm<HomeConfig>({
    resolver: zodResolver(homeConfigSchema),
    mode: 'onSubmit',
    defaultValues: {
      carousel: [],
      slots: [
        { title: '', cover: '', link: '' },
        { title: '', cover: '', link: '' },
      ],
    },
  })

  useEffect(() => {
    if (config) {
      methods.reset(config)
    }
  }, [config])

  const saveMutation = useMutation({
    mutationFn: async (data: HomeConfig) => {
      const { error } = await supabaseClient
        .from('homepage_singleton')
        .update({
          carousel: data.carousel,
          slots: data.slots,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1)
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('保存成功')
      refetch()
    },
    onError: (error) => {
      console.error(error)
      toast.error('保存失败')
    },
  })

  const onSubmit = (data: HomeConfig) => {
    saveMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <FormProvider {...methods}>
      <form className="relative flex flex-col px-6" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* 头部工具栏 */}
        <AdminPageHeadModule
          title="首页管理"
          description="管理轮播图和底部固定展位的内容"
          action={
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
              disabled={!methods.formState.isDirty || saveMutation.isPending}
              sx={{ px: 4, py: 1, borderRadius: 2 }}
            >
              {saveMutation.isPending ? '正在保存...' : '保存更改'}
            </Button>
          }
        />

        {/* 轮播图部分 */}
        <CarouselManager />
        <div className="my-8">
          <Divider />
        </div>
        {/* 固定展位部分 */}
        <SlotsManager />
      </form>
    </FormProvider>
  )
}
