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
    <Stack data-testid="dashboard-article-detail" bgcolor={'#F7F7F8'} height={44} justifyContent={'center'} px={2}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Stack flexDirection={'row'} gap={'51px'}>
          <Stack gap={0.5} flexDirection={'row'} fontSize={14} alignItems={'center'}>
            <Typography color={'#3F4145'} fontSize={14} fontWeight={400}>
              Таалагдсан
            </Typography>
            <span data-testid="rate">{rate}</span>
          </Stack>
          <Stack gap={0.5} flexDirection={'row'} fontSize={14} alignItems={'center'}>
            <Typography color={'#3F4145'} fontSize={14}>
              Сэтгэгдлүүд
            </Typography>
            <span data-testid="comment">{comment}</span>
          </Stack>
          <Stack gap={0.5} flexDirection={'row'} fontSize={14} alignItems={'center'}>
            <Typography color={'#3F4145'} fontSize={14}>
              Хуваалцсан
            </Typography>
            <span data-testid="share">{share}</span>
          </Stack>
        </Stack>

        <Stack>
          <span data-testid="close-icon">
            <HighlightOffIcon />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default DashBoardArticleDetail;
