import { Box, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import SingleImageUpload from '~/components/SingleImageUpload'
import { HomeConfig } from '~/routes/admin._index/route'

export default function SlotsManager() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<HomeConfig>()

  return (
    <>
      <Typography variant="h5" fontWeight="medium" mb={1}>
        固定展位设置
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        轮播图左侧的固定内容块
      </Typography>

      <Grid container spacing={4}>
        {[0, 1].map((index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card sx={{ borderRadius: 3, overflow: 'visible' }}>
              <Grid container>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <Box sx={{ p: 2, height: '100%' }}>
                    <Controller
                      control={control}
                      name={`slots.${index}.cover`}
                      render={({ field }) => (
                        <SingleImageUpload
                          {...field}
                          bucket="homepage"
                          className="w-full aspect-square sm:aspect-auto sm:h-full rounded-lg"
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                      展位 {index + 1}
                    </Typography>
                    <Stack spacing={3}>
                      <TextField
                        {...register(`slots.${index}.title`)}
                        label="标题"
                        placeholder="输入展位标题"
                        fullWidth
                        error={!!errors.slots?.[index]?.title}
                        helperText={errors.slots?.[index]?.title?.message}
                      />
                      <TextField
                        {...register(`slots.${index}.link`)}
                        label="跳转链接"
                        placeholder="https://..."
                        fullWidth
                      />
                    </Stack>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
