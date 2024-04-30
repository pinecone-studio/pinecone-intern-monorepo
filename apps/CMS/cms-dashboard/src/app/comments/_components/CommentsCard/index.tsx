import { Box, Button, Typography } from '@mui/material';
import { PiEyeClosed } from 'react-icons/pi';
import { MdDeleteOutline, MdReply } from 'react-icons/md';
import { TbPointFilled } from 'react-icons/tb';

type CommentsProps = {
  name?: string  ;
  email?: string;
  comment?: string;
  createdAt?: string;
  articleId?: string;
};

const Index = (props: CommentsProps) => {
  const { name, email, comment, createdAt, articleId } = props; 
  return (
    <Box width={928} borderRadius={2} bgcolor={'white'} height={240} mt={6} mb={6}>
      <Box padding={2}>
        <Typography fontSize={18} fontWeight={'bold'} lineHeight={2}>
         {name}
        </Typography>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Typography fontSize={16} color={'#5E6166'} lineHeight={2}>
            {email}
          </Typography>
          <Typography fontSize={16} color={'#5E6166'} lineHeight={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <TbPointFilled /> {createdAt}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography fontSize={16} fontWeight={'semi-bold'} lineHeight={2}>
            Post:
          </Typography>
          <Typography fontSize={16} color={'grey'}>
            {articleId}
          </Typography>
        </Box>
        <Typography fontSize={18} fontWeight={'bold'} lineHeight={2}>
          {comment}
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
