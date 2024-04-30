'use client';
import { Course } from '@/generated/index';
import { Stack, Typography } from '@mui/material';

const Courses = (props: Course) => {
const { id, thumbnail, title, description, position } = props;

  return (
    <Stack key={id} sx={{cursor:'pointer'}} data-testid="courseContain"  height={240} width={'100%'} overflow={'hidden'} border={'solid 1px #0000001A'} borderRadius={'12px'} bgcolor={'white'}>
      <Stack width={'100%'} height={120} borderRadius={'6px'} overflow={'hidden'}>
        <img data-testid="lessonImage" src={`${thumbnail}`} alt="lessonImage" />
      </Stack>
      <Stack height={120} width={'100%'} py={1} px={'21px'} justifyContent={'space-between'}>
        <Typography data-testid="titleTest" color={'#121316'} fontSize={16} fontWeight={600}>
          {title}
        </Typography>
        <Typography data-testid="infoTest" color={'#3F4145'} fontSize={14} fontWeight={400} textOverflow={'ellipsis'} height={42} overflow={'hidden'}>
          {description}
        </Typography>
        <Stack width={'fit-content'} px={1} py={'2px'} bgcolor={'#C1E6CF'} borderRadius={'12px'}>
          <Typography data-testid="lessonCountTest" display={'flex'} color={'#0A4E22'} fontSize={14} gap={'4px'} fontWeight={400}>
            {position}
            Lessons
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Courses;
