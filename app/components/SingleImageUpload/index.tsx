import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import React, { useRef, useState } from 'react'
import MotionDiv from '~/components/motion/MotionDiv'
import { toast } from 'react-toastify/unstyled'
import { getImageUrl } from '~/utils'
import { supabaseClient } from '~/utils/supabase'

export interface SingleImageUploadProps {
  value?: string
  onChange?: (value: string | undefined) => void
  className?: string
  // 储存桶name
  bucket: string
}

interface StorageFile {
  name: string
  id: string
  created_at: string
}

export default function SingleImageUpload({
  value,
  onChange,
  bucket,
  className,
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string>()
  const [imageError, setImageError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [hovered, setHovered] = useState(false)

  // 预览弹窗
  const [previewOpen, setPreviewOpen] = useState(false)

  // 服务器图片选择弹窗
  const [selectOpen, setSelectOpen] = useState(false)

  // 使用 React Query 获取服务器图片列表
  const {
    data: serverImages = [],
    isLoading: loadingImages,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ['storage-images', bucket],
    queryFn: async () => {
      const { data, error } = await supabaseClient.storage.from(bucket).list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (error) {
        toast.error('获取图片列表失败')
        throw error
      }
      // 过滤掉 .emptyFolderPlaceholder 文件
      return (data || []).filter((file) => file.name !== '.emptyFolderPlaceholder') as StorageFile[]
    },
    enabled: selectOpen,
    staleTime: 30 * 1000, // 30秒内不重新请求
  })

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      if (inputRef.current) {
        inputRef.current.files = null
      }
      setPreviewUrl(URL.createObjectURL(f))
      setImageError(false)
      setUploading(true)
      const { error, data } = await supabaseClient.storage
        .from(bucket)
        .upload(crypto.randomUUID(), f)
      setUploading(false)
      if (error) {
        toast.error('图片上传失败')
        setPreviewUrl(undefined)
      }

      if (data) {
        onChange?.(data.fullPath)
        // 上传成功后刷新图片列表
        refetchImages()
      }
    }
  }

  const clear = () => {
    onChange?.('')
    setPreviewUrl(undefined)
    setImageError(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleUploadClick = () => {
    if (uploading) return
    inputRef.current?.click()
  }

  const handlePreviewClick = () => {
    setPreviewOpen(true)
  }

  const handleSelectImage = (file: StorageFile) => {
    onChange?.(`${bucket}/${file.name}`)
    setPreviewUrl(undefined)
    setSelectOpen(false)
  }

  const hasImage = previewUrl || value

  return (
    <>
      <Box
        tabIndex={0}
        role="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={hasImage ? undefined : handleUploadClick}
        className={clsx(
          'relative overflow-hidden min-w-20 aspect-square flex items-center justify-center rounded',
          uploading ? 'cursor-wait' : hasImage ? 'cursor-default' : 'cursor-pointer',
          className
        )}
        sx={(theme) => ({
          border: `1px dashed ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
          ...(!hasImage && {
            '&:hover': {
              borderColor: theme.palette.primary.main,
              bgcolor: theme.palette.action.hover,
            },
          }),
          '&:focus-visible': {
            outline: 'none',
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
          },
        })}
      >
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleSelect} />

        {hasImage ? (
          <>
            {imageError ? (
              <Box
                className="w-full h-full flex items-center justify-center flex-col"
                sx={{
                  bgcolor: 'action.hover',
                  color: 'text.disabled',
                }}
              >
                <BrokenImageIcon fontSize="large" />
                <Typography variant="caption" mt={1}>
                  图片加载失败
                </Typography>
              </Box>
            ) : (
              <Box
                component="img"
                src={previewUrl ? previewUrl : value && getImageUrl(value)}
                alt="preview"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            )}

            {/* 上传中遮罩 */}
            {uploading && (
              <Box
                className="absolute inset-0 flex items-center justify-center"
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <CircularProgress size={32} sx={{ color: 'white' }} />
              </Box>
            )}

            {/* 悬浮工具栏 */}
            <AnimatePresence>
              {hovered && !uploading && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center gap-1"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <Tooltip title="上传图片">
                    <IconButton
                      size="small"
                      onClick={handleUploadClick}
                      sx={{
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      <CloudUploadOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="从服务器选择">
                    <IconButton
                      size="small"
                      onClick={() => setSelectOpen(true)}
                      sx={{
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      <CollectionsOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {!imageError && (
                    <Tooltip title="预览">
                      <IconButton
                        size="small"
                        onClick={handlePreviewClick}
                        sx={{
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        }}
                      >
                        <ZoomInIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="删除">
                    <IconButton
                      size="small"
                      onClick={clear}
                      sx={{
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </MotionDiv>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Box textAlign="center" color="text.secondary">
            <AddPhotoAlternateOutlinedIcon fontSize="large" />
            <Typography variant="body2" mt={1}>
              点击上传图片
            </Typography>
          </Box>
        )}
      </Box>

      {/* 图片预览弹窗 */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="lg">
        <Box
          component="img"
          src={previewUrl ? previewUrl : value && getImageUrl(value)}
          alt="preview"
          sx={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
        />
      </Dialog>

      {/* 从服务器选择图片弹窗 */}
      <Dialog open={selectOpen} onClose={() => setSelectOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>选择已有图片</DialogTitle>
        <DialogContent>
          {loadingImages ? (
            <ImageList cols={4} gap={8}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ImageListItem key={index}>
                  <Skeleton variant="rectangular" sx={{ aspectRatio: '1', width: '100%' }} />
                </ImageListItem>
              ))}
            </ImageList>
          ) : serverImages.length === 0 ? (
            <Box
              className="flex items-center justify-center"
              sx={{ height: 200, color: 'text.secondary' }}
            >
              <Typography>暂无图片</Typography>
            </Box>
          ) : (
            <ImageList cols={4} gap={8}>
              {serverImages.map((file) => (
                <ImageListItem
                  key={file.id}
                  sx={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: 1,
                    border: '2px solid transparent',
                    transition: 'border-color 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => handleSelectImage(file)}
                >
                  <Box
                    component="img"
                    src={getImageUrl(`${bucket}/${file.name}`)}
                    alt={file.name}
                    loading="lazy"
                    sx={{
                      aspectRatio: '1',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
