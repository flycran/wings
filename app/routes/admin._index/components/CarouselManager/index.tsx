import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { memo } from 'react'
import {
  Controller,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form'
import SingleImageUpload from '~/components/SingleImageUpload'
import { HomeConfig } from '~/routes/admin._index/route'

interface SortableCarouselCardProps {
  id: string
  index: number
  totalCount: number
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
}

function SortableCarouselCard({ id, index, totalCount, move, remove }: SortableCarouselCardProps) {
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
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        ref={setNodeRef}
        style={style}
        elevation={isDragging ? 8 : 2}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': { transform: isDragging ? undefined : 'translateY(-4px)' },
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Box sx={{ position: 'relative', pt: '56.25%', bgcolor: 'action.hover' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Controller
              control={control}
              name={`carousel.${index}.cover`}
              render={({ field }) => (
                <SingleImageUpload {...field} bucket="homepage" className="w-full h-full" />
              )}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 0.5,
              bgcolor: 'background.paper',
              backdropFilter: 'blur(8px)',
              borderRadius: 1,
              p: 0.5,
              zIndex: 1,
              boxShadow: 1,
              opacity: 0.95,
            }}
          >
            <IconButton
              size="small"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              title="向前移动"
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              disabled={index === totalCount - 1}
              onClick={() => move(index, index + 1)}
              title="向后移动"
            >
              <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => remove(index)} title="删除">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box
            {...attributes}
            {...listeners}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'background.paper',
              backdropFilter: 'blur(8px)',
              borderRadius: 1,
              p: 0.5,
              zIndex: 1,
              boxShadow: 1,
              opacity: 0.95,
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <DragIndicatorIcon fontSize="small" />
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
                            component="input"
                            type="color"
                            value={field.value || '#000000'}
                            onChange={(e) => field.onChange(e.target.value)}
                            sx={{
                              width: 26,
                              height: 26,
                              border: 'none',
                              borderRadius: 1,
                              cursor: 'pointer',
                              '&::-webkit-color-swatch-wrapper': {
                                padding: 0,
                              },
                              '&::-webkit-color-swatch': {
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                              },
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
      </Card>
    </Grid>
  )
}

const SortableCarouselCardMemo = memo(SortableCarouselCard)

export default function CarouselManager() {
  const { control } = useFormContext<HomeConfig>()

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

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="medium">
          轮播图设置 ({fields.length}/8)
        </Typography>
        {fields.length < 8 && (
          <Button variant="outlined" startIcon={<AddIcon />} onClick={onAdd} size="small">
            添加项
          </Button>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        轮播图支持拖拽卡片进行排序，最多可添加 8 项。
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
      </DndContext>
    </>
  )
}
