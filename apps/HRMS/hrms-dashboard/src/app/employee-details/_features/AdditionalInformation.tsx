import { Stack, Typography } from '@mui/material';
import { UpdateButton } from '../_components/UpdateButton';
import { Dependent } from '../../../generated';

export const AdditionalInformation = ({ phone, dependency }: Dependent) => {
  return (
    <Stack sx={{ borderRadius: '12px' }} minWidth={'772px'}>
      <Stack padding={'24px'} display={'flex'} flexDirection={'column'} gap={'24px'}>
        <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Typography data-testid="additional-information" fontSize={'18px'} fontWeight={'600'}>
            Нэмэлт мэдээлэл
          </Typography>
          <UpdateButton data-testid="update-Button" />
        </Stack>
        <Stack>
          <Typography data-testid="phone-number" color={'primary.light'}>
            Яаралтай үед холбоо барих хүний дугаар
          </Typography>
          <Typography fontWeight={'600'}>{phone}</Typography>
        </Stack>
        <Stack>
          <Typography data-testid="dependent" color={'primary.light'}>
            Хэн болох
          </Typography>
          <Typography fontWeight={'600'}>{dependency}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
