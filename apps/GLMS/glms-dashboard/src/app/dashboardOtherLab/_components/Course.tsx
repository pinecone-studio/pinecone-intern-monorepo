'use client';
import { Stack, Typography } from '@mui/material';

type CourseType = {
  image: string;
  title: string;
  information: string;
  lessonCount: number;
};

const Course = (props: CourseType) => {
  const { image, title, information, lessonCount } = props;
  return (
    <Stack data-testid="courseContain" height={240} width={'100%'} overflow={'hidden'} border={'solid 1px #0000001A'} borderRadius={'12px'} bgcolor={'white'}>
      <Stack width={'100%'} height={120} borderRadius={'6px'} overflow={'hidden'}>
        <img data-testid="lessonImage" src={image} alt="lessonImage" />
      </Stack>
      <Stack height={120} width={'100%'} py={1} px={'21px'} justifyContent={'space-between'}>
        <Typography data-testid="titleTest" color={'#121316'} fontSize={16} fontWeight={600}>
          {title}
        </Typography>
        <Typography data-testid="infoTest" color={'#3F4145'} fontSize={14} fontWeight={400} textOverflow={'ellipsis'} height={42} overflow={'hidden'}>
          {information}
        </Typography>
        <Stack width={'fit-content'} px={1} py={'2px'} bgcolor={'#C1E6CF'} borderRadius={'12px'}>
          <Typography data-testid="lessonCountTest" display={'flex'} color={'#0A4E22'} fontSize={14} gap={'4px'} fontWeight={400}>
            {lessonCount}
            Lessons
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Course;
