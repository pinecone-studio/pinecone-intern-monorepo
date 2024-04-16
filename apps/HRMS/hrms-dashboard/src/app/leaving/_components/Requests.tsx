'use client';
import { headers } from '../_features/utils/Table';
import { useGetRequestsQuery } from '../../../generated';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Stack, Box } from '@mui/material';

const Requests = () => {
  const { data, loading, error } = useGetRequestsQuery();
  const currentDate = new Date().toLocaleDateString();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack sx={{ bgcolor: 'rgba(247, 247, 248, 1)', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', paddingY: '30px' }}>
      <Stack sx={{ width: '1154px', bgcolor: 'white', borderRadius: '10px', padding: '16px', display: 'flex', gap: '12px' }}>
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>Чөлөө</Typography>
          <Typography>{currentDate}</Typography>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant="text" sx={{ color: 'black' }}>
              Хүсэлт
            </Button>
            <Button variant="text" sx={{ color: 'black' }}>
              Ажилчид
            </Button>
            <Button variant="text" sx={{ color: 'black' }}>
              Түүх
            </Button>
          </Stack>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'rgba(247, 247, 248, 1)' }}>
                <TableRow>
                  {headers.map((data, index) => (
                    <TableCell key={index}>{data}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.getRequests.map((dat, index) => (
                    <TableRow key={index} style={{ cursor: 'pointer' }}>
                      <TableCell>{dat._id}</TableCell>
                      <TableCell>{dat.declinedReasoning}</TableCell>
                      <TableCell>{dat.description}</TableCell>
                      <TableCell>{dat.totalHour}</TableCell>
                      <TableCell>{dat.totalHour}</TableCell>
                      <TableCell>
                        <Typography
                          style={{
                            borderRadius: '15px',
                            textAlign: 'center',
                            background: dat.status.toLowerCase() === 'approved' ? 'rgba(193, 230, 207, 1)' : dat.status.toLowerCase() === 'declined' ? 'rgba(252, 186, 190, 1)' : '',
                            border: dat.status.toLowerCase() === 'pending' ? '1px solid rgba(214, 216, 219, 1)' : '',
                          }}
                        >
                          {dat.status.toLowerCase() === 'approved'
                            ? 'Зөвшөөрсөн'
                            : dat.status.toLowerCase() === 'declined'
                            ? 'Татгалзсан'
                            : dat.status.toLowerCase() === 'pending'
                            ? 'Шинэ хүсэлт'
                            : dat.status.toLowerCase()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </Stack>
  );
};
export default Requests;
