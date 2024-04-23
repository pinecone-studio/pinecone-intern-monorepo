import { styled } from '@mui/system';

const Loading = styled('div')({
  backgroundColor: 'transparent',
  borderTop: '5px solid #000',
  borderRight: '5px solid #000',
  borderLeft: '5px solid #fff',
  borderBottom: '5px solid #fff',
  height: '24px',
  width: '24px',
  borderRadius: '50%',
  animation: 'linear 2s spin infinite',
});

export const Loader = () => {
  return <Loading />;
};
