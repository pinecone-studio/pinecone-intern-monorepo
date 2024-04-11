import { Stack, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export type DashBoardArticleDetailType = {
  rate: number;
  comment: number;
  share: number;
};

const DashBoardArticleDetail = (props: DashBoardArticleDetailType) => {
  const { rate, comment, share } = props;
  return (
    <Stack data-testid="dashboard-article-detail" width={'100%'} bgcolor={'#F7F7F8'} height={44} justifyContent={'center'} px={2}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Stack flexDirection={'row'} gap={'51px'}>
          <Stack gap={1} flexDirection={'row'}>
            <Typography color={'#393939'}>Таалагдсан</Typography>
            <span data-testid="rate">{rate}</span>
          </Stack>
          <Stack gap={1} flexDirection={'row'}>
            <Typography color={'#393939'}>Сэтгэгдлүүд</Typography>
            <span data-testid="comment">{comment}</span>
          </Stack>
          <Stack gap={1} flexDirection={'row'}>
            <Typography color={'#393939'}>Хуваалцсан</Typography>
            <span data-testid="share">{share}</span>
          </Stack>
        </Stack>
        <Stack>
          <span data-testid="close-icon">
            {' '}
            <HighlightOffIcon />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default DashBoardArticleDetail;
