import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
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

export default function SingleImageUpload({
  value,
  onChange,
  bucket,
  className,
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [previewUrl, setPreviewUrl] = useState<string>()

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setPreviewUrl(URL.createObjectURL(f))
      const { error, data } = await supabaseClient.storage.from(bucket).upload(f.name, f)
      if (error) {
        toast.error('图片上传失败')
        setPreviewUrl(undefined)
      }

      if (data) {
        onChange?.(data.fullPath)
      }
    }
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.('')
    setPreviewUrl(undefined)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Box
      tabIndex={0}
      role="button"
      onClick={() => inputRef.current?.click()}
      className={clsx(
        'relative overflow-hidden min-w-20 aspect-square cursor-pointer flex items-center justify-center',
        className
      )}
      sx={(theme) => ({
        borderRadius: 2,
        border: `1px dashed ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
        '&:hover': {
          borderColor: theme.palette.primary.main,
          bgcolor: theme.palette.action.hover,
        },
        '&:focus-visible': {
          outline: 'none',
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
        },
      })}
    >
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleSelect} />

      {previewUrl || value ? (
        <>
          <Box
            component="img"
            src={value ? getImageUrl(value) : previewUrl}
            alt="preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            size="small"
            onClick={clear}
            sx={(theme) => ({
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: theme.palette.background.paper,
              '&:hover': {
                bgcolor: theme.palette.background.default,
              },
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
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
  )
}
