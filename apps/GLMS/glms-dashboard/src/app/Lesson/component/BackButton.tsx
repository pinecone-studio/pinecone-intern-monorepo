  import { Button, Stack, Typography } from '@mui/material'
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import { useRouter } from 'next/navigation';
  const BackButton = () => {
    const router = useRouter()
    const handleBack = () => {
  router.push('/dashboardOtherLab')
    }
    return (
      <Stack  direction="row" paddingBottom="94px" paddingTop="32px">
        <Button onClick={handleBack} sx={{color:'black'}}>
        <ArrowBackIcon />
      <Typography fontSize="18px" fontWeight="600">
        Сэдвүүд
      </Typography>
        </Button>

    </Stack>
    )
  }

  export default BackButton
