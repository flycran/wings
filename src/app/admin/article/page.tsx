'use client'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ImageIcon from '@mui/icons-material/Image'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Popover,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AdminCard from '~/components/admin-module/AdminCard'
import AdminPageFooterModule from '~/components/admin-module/AdminPageFooterModule'
import AdminPageHeadModule from '~/components/admin-module/AdminPageHeadModule'
import { useSearchNumber } from '~/hooks/syncSearch'
import { getImageUrl } from '~/utils'
import { supabaseClient } from '~/utils/supabase'
import { Tables } from '~/types/supabase'

interface ArticleWithRelations {
  id: number
  title: string
  category_id: number | null
  created_at: string
  updated_at: string
  cover: string
  describe: string
  categorys: Tables<'categorys'> | null
  article_columns: Array<{
    column_id: number
    columns: Tables<'columns'>
  }>
}

interface ArticlesResponse {
  data: ArticleWithRelations[]
  count: number
}

const PAGE_SIZE = 8

export default function articles() {
  const [page, setPage] = useSearchNumber('page', 1)
  const [deleteAnchorEl, setDeleteAnchorEl] = useState<HTMLElement | null>(null)
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null)

  const { data, isLoading, refetch } = useQuery<ArticlesResponse>({
    queryKey: ['articles', { page, pageSize: PAGE_SIZE }],
    queryFn: async () => {
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const [articlesRes, countRes] = await Promise.all([
        supabaseClient
          .from('articles')
          .select(
            `
            id, title, category_id, created_at, updated_at, cover, describe,
            categorys(*),
            article_columns!left(
              column_id,
              columns!inner(*)
            )
          `
          )
          .order('updated_at', { ascending: false })
          .range(from, to),
        supabaseClient.from('articles').select('*', { count: 'exact', head: true }),
      ])

      if (articlesRes.error) {
        toast.error('获取文章列表失败')
        throw articlesRes.error
      }

      return {
        data: articlesRes.data as ArticleWithRelations[],
        count: countRes.count ?? 0,
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabaseClient.from('articles').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('删除成功')
      refetch()
    },
    onError: () => {
      toast.error('删除失败')
    },
  })

  const handleEdit = (id: number) => {
    window.open(`/admin/article/editor?id=${id}`, '_blank')
  }

  const handleView = (id: number) => {
    window.open(`/article/${id}`, '_blank')
  }

  const handleDelete = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setArticleToDelete(id)
    setDeleteAnchorEl(event.currentTarget)
  }

  const handleConfirmDelete = () => {
    if (articleToDelete !== null) {
      deleteMutation.mutate(articleToDelete)
      setDeleteAnchorEl(null)
      setArticleToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteAnchorEl(null)
    setArticleToDelete(null)
  }

  const handleCreate = () => {
    window.open('/admin/article/editor', '_blank')
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const totalPages = Math.ceil((data?.count ?? 0) / PAGE_SIZE)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="relative flex flex-col min-h-full">
      {/* 头部 */}
      <AdminPageHeadModule
        title="文章管理"
        description={
          data && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              共 {data.count} 篇文章
            </Typography>
          )
        }
        action={
          <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={handleCreate}>
            新文章
          </Button>
        }
      />
      <div className="md:px-6 px-4">
        {/* 加载状态 */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* 文章卡片列表 */}
        {!isLoading && data && (
          <Grid container spacing={3}>
            {data.data.map((article) => (
              <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <AdminCard className="flex flex-col h-full">
                  {/* 封面图片 */}
                  {article.cover ? (
                    <CardMedia
                      component="img"
                      image={getImageUrl(article.cover)}
                      alt={article.title}
                      className="object-cover w-full h-45"
                      sx={{
                        backgroundColor: 'grey.200',
                      }}
                    />
                  ) : (
                    <Box
                      className="w-full h-45 flex items-center justify-center"
                      sx={{
                        backgroundColor: 'grey.200',
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                    </Box>
                  )}

                  {/* 内容区域 */}
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <div className="mb-2">
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        className="font-bold ellipsis"
                      >
                        {article.title || '无标题'}
                      </Typography>
                    </div>
                    <div className="mb-4">
                      <Typography variant="body2" color="text.secondary" className="ellipsis-2">
                        {article.describe || '暂无描述'}
                      </Typography>
                    </div>

                    {/* 类别标签 */}
                    {article.categorys && (
                      <Chip
                        label={article.categorys.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                        className="mb-1"
                      />
                    )}

                    {/* 专栏标签 */}
                    {article.article_columns.length > 0 && (
                      <div className="mb-1 flex gap-2 flex-wrap">
                        {article.article_columns.slice(0, 2).map((ac) => (
                          <Chip
                            key={ac.column_id}
                            label={ac.columns.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {article.article_columns.length > 2 && (
                          <Chip
                            label={`+${article.article_columns.length - 2}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </div>
                    )}

                    {/* 时间信息 */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      更新: {formatDate(article.updated_at)}
                    </Typography>
                  </CardContent>

                  {/* 操作按钮 */}
                  <CardActions className="justify-end">
                    <IconButton
                      size="small"
                      color="default"
                      onClick={() => handleView(article.id)}
                      title="查看"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(article.id)}
                      title="编辑"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => handleDelete(e, article.id)}
                      title="删除"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </AdminCard>
              </Grid>
            ))}
            {/* 空状态 */}
            {data.data.length === 0 && (
              <div className="w-full h-full flex flex-col items-center py-32">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  还没有文章
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  点击右上角的 + 按钮创建第一篇文章吧
                </Typography>
              </div>
            )}
          </Grid>
        )}
      </div>
      {/* 分页 */}
      <AdminPageFooterModule>
        <div className="p-4 flex justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      </AdminPageFooterModule>

      {/* 删除确认 Popover */}
      <Popover
        open={!!deleteAnchorEl}
        anchorEl={deleteAnchorEl}
        onClose={handleCancelDelete}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            确认删除
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            确定要删除这篇文章吗？此操作不可恢复。
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" onClick={handleCancelDelete}>
              取消
            </Button>
            <Button size="small" variant="contained" color="error" onClick={handleConfirmDelete}>
              删除
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  )
}
