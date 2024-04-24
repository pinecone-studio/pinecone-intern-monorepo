import { Box, Button, Typography } from '@mui/material';
import { PiEyeClosed } from 'react-icons/pi';
import { MdDeleteOutline, MdReply } from 'react-icons/md';
import { TbPointFilled } from 'react-icons/tb';

const Index = () => {
  return (
    <Box width={928} borderRadius={2} bgcolor={'white'} height={240}>
      <Box padding={2}>
        <Typography fontSize={18} fontWeight={'bold'} lineHeight={2}>
          Сувдан
        </Typography>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography fontSize={16} color={'#5E6166'} lineHeight={2}>
            suvdaa2@gmail.com
          </Typography>
          <Typography fontSize={16} color={'#5E6166'} lineHeight={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <TbPointFilled /> 1 минутийн өмнө
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography fontSize={16} fontWeight={'semi-bold'} lineHeight={2}>
            Post:
          </Typography>
          <Typography fontSize={16} color={'grey'}>
            Morphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд
          </Typography>
        </Box>
        <Typography fontSize={18} fontWeight={'bold'} lineHeight={2}>
          Хулхины газар байна оо
        </Typography>
      </Box>
      <Box borderTop={1} borderColor={'#5E6166'} sx={{ display: 'flex', justifyContent: 'space-between' }} padding={3}>
        <Box>
          <Button sx={{ gap: 1 }}>
            <PiEyeClosed /> <Typography fontSize={12}>Нуухаа болих</Typography>
          </Button>
          <Button sx={{ gap: 1 }}>
            <MdDeleteOutline />
            <Typography fontSize={12}> Устгах</Typography>
          </Button>
        </Box>
        <Button sx={{ gap: 1 }}>
          <MdReply />
          <Typography fontSize={12}>Хариулах</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default Index;
