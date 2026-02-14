import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import {
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { memo, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import {
  Controller,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form'
import AdminCard from '~/components/AdminModule/AdminCard'
import { AdminPageSubheadModule } from '~/components/AdminModule/AdminPageHeadModule'
import { PortalBody } from '~/components/PortalBody'
import SingleImageUpload from '~/components/SingleImageUpload'
import { HomeConfig } from '~/routes/admin._index/route'

interface SortableCarouselCardProps {
  id: string
  index: number
  totalCount: number
  move?: UseFieldArrayMove
  remove?: UseFieldArrayRemove
}

function SortableCarouselCard({ id, index, totalCount, move, remove }: SortableCarouselCardProps) {
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState<HTMLElement | null>(null)

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<HomeConfig>()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} ref={setNodeRef} style={style}>
      <AdminCard
        className={clsx('h-full flex flex-col', [
          isDragging ? 'cursor-grabbing z-20 opacity-30' : 'cursor-grab',
        ])}
      >
        <Box className="relative" sx={{ pt: '56.25%', bgcolor: 'action.hover' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <Controller
              control={control}
              name={`carousel.${index}.cover`}
              render={({ field }) => (
                <SingleImageUpload {...field} bucket="homepage" className="w-full h-full" />
              )}
            />
          </div>
          <Box
            className="absolute top-2 left-2 h-8 w-8 rounded-lg backdrop-blur-sm z-1 flex items-center justify-center opacity-90 cursor-grab group-active:cursor-grabbing"
            {...attributes}
            {...listeners}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>
          <Box
            className="absolute top-2 left-12 h-8 flex items-center gap-1 rounded-lg backdrop-blur-sm px-1 z-1 opacity-90"
            sx={{
              bgcolor: 'background.paper',
            }}
          >
            <IconButton
              size="small"
              disabled={index === 0}
              onClick={() => move?.(index, index - 1)}
              title="向前移动"
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              disabled={index === totalCount - 1}
              onClick={() => move?.(index, index + 1)}
              title="向后移动"
            >
              <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => remove?.(index)} title="删除">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <TextField
              {...register(`carousel.${index}.title` as const)}
              label="标题"
              placeholder="输入轮播标题"
              fullWidth
              size="small"
              error={!!errors.carousel?.[index]?.title}
              helperText={errors.carousel?.[index]?.title?.message}
            />
            <Controller
              control={control}
              name={`carousel.${index}.color`}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="主题色"
                  placeholder="#HEX"
                  fullWidth
                  size="small"
                  error={!!errors.carousel?.[index]?.color}
                  helperText={errors.carousel?.[index]?.color?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            onClick={(e) => setColorPickerAnchorEl(e.currentTarget)}
                            className="w-6 h-6 rounded cursor-pointer"
                            style={{
                              backgroundColor: field.value || '#000000',
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <TextField
              {...register(`carousel.${index}.link` as const)}
              label="跳转链接"
              placeholder="https://..."
              fullWidth
              size="small"
            />
          </Stack>
        </CardContent>
      </AdminCard>
      <Popover
        open={!!colorPickerAnchorEl}
        anchorEl={colorPickerAnchorEl}
        onClose={() => setColorPickerAnchorEl(null)}
      >
        <Controller
          control={control}
          name={`carousel.${index}.color`}
          render={({ field }) => (
            <div className="w-54 h-54 p-2">
              <HexColorPicker color={field.value} onChange={field.onChange} />
            </div>
          )}
        />
      </Popover>
    </Grid>
  )
}

const SortableCarouselCardMemo = memo(SortableCarouselCard)

export default function CarouselManager() {
  const { control } = useFormContext<HomeConfig>()
  const [draggingId, setDraggingId] = useState('')

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'carousel',
    keyName: '_id',
  })

  const onAdd = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      cover: '',
      color: '#3b82f6',
      link: '',
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id)
      const newIndex = fields.findIndex((field) => field.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex)
      }
    }
  }
  const handleDragStart = (event: DragStartEvent) => {
    setDraggingId(event.active.id as string)
  }

  return (
    <>
      <AdminPageSubheadModule
        title={`轮播图设置 (${fields.length}/8)`}
        description="轮播图支持拖拽卡片进行排序，最多可添加 8 项。"
        action={
          fields.length < 8 && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={onAdd} size="small">
              添加项
            </Button>
          )
        }
      />
      <div className="md:px-6 px-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields.map((f) => f.id)} strategy={rectSortingStrategy}>
            <Grid container spacing={3}>
              {fields.map((field, index) => (
                <SortableCarouselCardMemo
                  key={field.id}
                  id={field.id}
                  index={index}
                  totalCount={fields.length}
                  move={move}
                  remove={remove}
                />
              ))}
              {fields.length === 0 && (
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      py: 8,
                      textAlign: 'center',
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 4,
                      color: 'text.secondary',
                    }}
                  >
                    <Typography>暂无轮播图，点击右上角添加按钮创建</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </SortableContext>
          <PortalBody>
            <DragOverlay>
              {!!draggingId && (
                <SortableCarouselCardMemo
                  id={draggingId}
                  index={fields.findIndex((field) => field.id === draggingId)}
                  totalCount={fields.length}
                  move={move}
                  remove={remove}
                />
              )}
            </DragOverlay>
          </PortalBody>
        </DndContext>
      </div>
    </>
  )
}
