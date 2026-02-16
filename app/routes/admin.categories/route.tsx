import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AdminPageHeadModule from '~/components/admin-module/AdminPageHeadModule'
import SingleImageUpload from '~/components/SingleImageUpload'
import { supabaseClient } from '~/utils/supabase'
import { Tables } from '../../../types/supabase'

type Category = Tables<'categorys'>
type Column = Tables<'columns'>

type TabValue = 'categories' | 'columns'

interface CategoryFormData {
  id?: number
  name: string
}

interface ColumnFormData {
  id?: number
  name: string
  description: string
  cover: string
}

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<TabValue>('categories')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // 表单状态
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({ name: '' })
  const [columnForm, setColumnForm] = useState<ColumnFormData>({
    name: '',
    description: '',
    cover: '',
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{
    id: number
    type: TabValue
    name: string
  } | null>(null)

  // 获取类别列表
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('categorys')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) {
        toast.error('获取类别列表失败')
        throw error
      }
      return data as Category[]
    },
  })

  // 获取专栏列表
  const {
    data: columns,
    isLoading: isColumnsLoading,
    refetch: refetchColumns,
  } = useQuery({
    queryKey: ['columns'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('columns')
        .select('*')
        .order('id', { ascending: false })
      if (error) {
        toast.error('获取专栏列表失败')
        throw error
      }
      return data as Column[]
    },
  })

  // 创建/更新类别
  const categoryMutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
      if (data.id) {
        const { error } = await supabaseClient
          .from('categorys')
          .update({ name: data.name })
          .eq('id', data.id)
        if (error) throw error
      } else {
        const { error } = await supabaseClient.from('categorys').insert({ name: data.name })
        if (error) throw error
      }
    },
    onSuccess: () => {
      toast.success(selectedCategory || isCreating ? '保存成功' : '创建成功')
      refetchCategories()
      if (isCreating) {
        setIsCreating(false)
        setCategoryForm({ name: '' })
      }
    },
    onError: () => {
      toast.error('保存失败')
    },
  })

  // 创建/更新专栏
  const columnMutation = useMutation({
    mutationFn: async (data: ColumnFormData) => {
      if (data.id) {
        const { error } = await supabaseClient
          .from('columns')
          .update({
            name: data.name,
            description: data.description || null,
            cover: data.cover || null,
          })
          .eq('id', data.id)
        if (error) throw error
      } else {
        const { error } = await supabaseClient.from('columns').insert({
          name: data.name,
          description: data.description || null,
          cover: data.cover || null,
        })
        if (error) throw error
      }
    },
    onSuccess: () => {
      toast.success(selectedColumn || isCreating ? '保存成功' : '创建成功')
      refetchColumns()
      if (isCreating) {
        setIsCreating(false)
        setColumnForm({ name: '', description: '', cover: '' })
      }
    },
    onError: () => {
      toast.error('保存失败')
    },
  })

  // 删除类别
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabaseClient.from('categorys').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('删除成功')
      refetchCategories()
      if (selectedCategory?.id === itemToDelete?.id) {
        setSelectedCategory(null)
        setCategoryForm({ name: '' })
      }
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    },
    onError: () => {
      toast.error('删除失败')
    },
  })

  // 删除专栏
  const deleteColumnMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabaseClient.from('columns').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('删除成功')
      refetchColumns()
      if (selectedColumn?.id === itemToDelete?.id) {
        setSelectedColumn(null)
        setColumnForm({ name: '', description: '', cover: '' })
      }
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    },
    onError: () => {
      toast.error('删除失败')
    },
  })

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab)
    setSelectedCategory(null)
    setSelectedColumn(null)
    setIsCreating(false)
    setCategoryForm({ name: '' })
    setColumnForm({ name: '', description: '', cover: '' })
  }

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
    setSelectedColumn(null)
    setIsCreating(false)
    setCategoryForm({ id: category.id, name: category.name })
  }

  const handleSelectColumn = (column: Column) => {
    setSelectedColumn(column)
    setSelectedCategory(null)
    setIsCreating(false)
    setColumnForm({
      id: column.id,
      name: column.name,
      description: column.description || '',
      cover: column.cover || '',
    })
  }

  const handleCreate = () => {
    setIsCreating(true)
    setSelectedCategory(null)
    setSelectedColumn(null)
    if (activeTab === 'categories') {
      setCategoryForm({ name: '' })
    } else {
      setColumnForm({ name: '', description: '', cover: '' })
    }
  }

  const handleCancelEdit = () => {
    setIsCreating(false)
    setSelectedCategory(null)
    setSelectedColumn(null)
    setCategoryForm({ name: '' })
    setColumnForm({ name: '', description: '', cover: '' })
  }

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) {
      toast.error('名称不能为空')
      return
    }
    categoryMutation.mutate(categoryForm)
  }

  const handleSaveColumn = () => {
    if (!columnForm.name.trim()) {
      toast.error('名称不能为空')
      return
    }
    columnMutation.mutate(columnForm)
  }

  const handleDelete = (id: number, name: string) => {
    setItemToDelete({ id, type: activeTab, name })
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!itemToDelete) return
    if (itemToDelete.type === 'categories') {
      deleteCategoryMutation.mutate(itemToDelete.id)
    } else {
      deleteColumnMutation.mutate(itemToDelete.id)
    }
  }

  const isLoading = activeTab === 'categories' ? isCategoriesLoading : isColumnsLoading
  const isMutating =
    categoryMutation.isPending ||
    columnMutation.isPending ||
    deleteCategoryMutation.isPending ||
    deleteColumnMutation.isPending

  const isEditing = isCreating || selectedCategory !== null || selectedColumn !== null

  return (
    <div className="relative flex flex-col px-6 min-h-full">
      {/* 头部 */}
      <AdminPageHeadModule title="类别和专栏管理" description="管理文章的类别和专栏分类" />

      <Grid container spacing={4}>
        {/* 左侧：列表区域 */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Card sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            {/* Tab 切换 */}
            <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
              <ListItemButton
                selected={activeTab === 'categories'}
                onClick={() => handleTabChange('categories')}
                sx={{ flex: 1, justifyContent: 'center', py: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {activeTab === 'categories' ? (
                    <FolderIcon color="primary" />
                  ) : (
                    <FolderOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`类别 (${categories?.length || 0})`}
                  primaryTypographyProps={{ fontWeight: activeTab === 'categories' ? 600 : 400 }}
                />
              </ListItemButton>
              <Divider orientation="vertical" flexItem />
              <ListItemButton
                selected={activeTab === 'columns'}
                onClick={() => handleTabChange('columns')}
                sx={{ flex: 1, justifyContent: 'center', py: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {activeTab === 'columns' ? (
                    <NewspaperIcon color="primary" />
                  ) : (
                    <NewspaperOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`专栏 (${columns?.length || 0})`}
                  primaryTypographyProps={{ fontWeight: activeTab === 'columns' ? 600 : 400 }}
                />
              </ListItemButton>
            </Box>

            {/* 添加按钮 */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleCreate}
                disabled={isCreating}
              >
                新建{activeTab === 'categories' ? '类别' : '专栏'}
              </Button>
            </Box>

            {/* 列表内容 */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress size={32} />
                </Box>
              ) : activeTab === 'categories' ? (
                <List dense>
                  {categories?.map((category) => (
                    <ListItem
                      key={category.id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(category.id, category.name)
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        selected={selectedCategory?.id === category.id}
                        onClick={() => handleSelectCategory(category)}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <FolderIcon
                            fontSize="small"
                            color={selectedCategory?.id === category.id ? 'primary' : 'inherit'}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={category.name}
                          secondary={new Date(category.created_at).toLocaleDateString('zh-CN')}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {categories?.length === 0 && (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        暂无类别，点击上方按钮创建
                      </Typography>
                    </Box>
                  )}
                </List>
              ) : (
                <List dense>
                  {columns?.map((column) => (
                    <ListItem
                      key={column.id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(column.id, column.name)
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        selected={selectedColumn?.id === column.id}
                        onClick={() => handleSelectColumn(column)}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <NewspaperIcon
                            fontSize="small"
                            color={selectedColumn?.id === column.id ? 'primary' : 'inherit'}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={column.name}
                          secondary={column.description || '暂无描述'}
                          secondaryTypographyProps={{ noWrap: true }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {columns?.length === 0 && (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        暂无专栏，点击上方按钮创建
                      </Typography>
                    </Box>
                  )}
                </List>
              )}
            </Box>
          </Card>
        </Grid>

        {/* 右侧：编辑区域 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Card sx={{ height: 'calc(100vh - 200px)' }}>
            {!isEditing ? (
              // 空状态
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                {activeTab === 'categories' ? (
                  <FolderOutlinedIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                ) : (
                  <NewspaperOutlinedIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                )}
                <Typography variant="h6" gutterBottom>
                  选择或创建{activeTab === 'categories' ? '类别' : '专栏'}
                </Typography>
                <Typography variant="body2">
                  从左侧列表选择一个项目，或点击"新建"按钮创建
                </Typography>
              </Box>
            ) : (
              // 编辑表单
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* 表单头部 */}
                <Box
                  sx={{
                    p: 3,
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {isCreating
                      ? `新建${activeTab === 'categories' ? '类别' : '专栏'}`
                      : '编辑信息'}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleCancelEdit}>
                      取消
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={activeTab === 'categories' ? handleSaveCategory : handleSaveColumn}
                      disabled={isMutating}
                    >
                      {isMutating ? <CircularProgress size={20} /> : '保存'}
                    </Button>
                  </Stack>
                </Box>

                {/* 表单内容 */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                  {activeTab === 'categories' ? (
                    // 类别表单
                    <Stack spacing={3} maxWidth={480}>
                      <TextField
                        label="类别名称"
                        placeholder="输入类别名称"
                        fullWidth
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        helperText="类别用于对文章进行基础分类"
                      />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          预览
                        </Typography>
                        <Chip
                          label={categoryForm.name || '未命名类别'}
                          color="primary"
                          variant="outlined"
                          size="medium"
                        />
                      </Box>
                    </Stack>
                  ) : (
                    // 专栏表单
                    <Stack spacing={4} maxWidth={600}>
                      <TextField
                        label="专栏名称"
                        placeholder="输入专栏名称"
                        fullWidth
                        value={columnForm.name}
                        onChange={(e) => setColumnForm({ ...columnForm, name: e.target.value })}
                      />
                      <TextField
                        label="专栏描述"
                        placeholder="输入专栏描述（可选）"
                        fullWidth
                        multiline
                        rows={3}
                        value={columnForm.description}
                        onChange={(e) =>
                          setColumnForm({ ...columnForm, description: e.target.value })
                        }
                        helperText="简短描述专栏的内容主题"
                      />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          封面图片
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 2, display: 'block' }}
                        >
                          建议尺寸 400x300，用于专栏展示
                        </Typography>
                        <SingleImageUpload
                          value={columnForm.cover}
                          onChange={(value) => setColumnForm({ ...columnForm, cover: value || '' })}
                          bucket="cover"
                          className="w-48 h-36"
                        />
                      </Box>
                    </Stack>
                  )}
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs">
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            确定要删除 "{itemToDelete?.name}" 吗？此操作不可恢复。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isMutating}
          >
            {isMutating ? <CircularProgress size={20} /> : '删除'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
