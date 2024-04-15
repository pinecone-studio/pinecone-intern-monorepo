'use client';
import { useState } from 'react';
import { headers } from './utils/Table';
import { useGetRequestsQuery } from '../../../generated';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Stack, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const Requests = () => {
  const router = useRouter();
  const { data, loading, error } = useGetRequestsQuery();
  const [filteredData, setFilteredData] = useState([]);

  const currentDate = new Date().toLocaleDateString();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filterDataByToday = () => {
    const todayRequests = data?.getRequests.filter((dat) => {
      const requestDate = new Date(dat.createdAt).toLocaleDateString();
      return requestDate === currentDate;
    });
    setFilteredData(todayRequests);
  };
  const filterDataByWeek = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekRequests = data?.getRequests.filter((dat) => new Date(dat.createdAt) >= weekAgo);
    setFilteredData(weekRequests);
  };

  const requestsToShow = filteredData.length > 0 ? filteredData : data?.getRequests;

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
          <Button onClick={filterDataByToday} sx={{ color: 'black' }}>
            Today
          </Button>
          <Button onClick={filterDataByWeek} sx={{ color: 'black' }}>
            Week
          </Button>
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
                {requestsToShow?.map((dat, index) => (
                  <TableRow key={index} onClick={() => router.push(`/leaving/Detail?requestId=${dat._id}`)} style={{ cursor: 'pointer' }}>
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
                          background: dat.status === 'APPROVED' ? 'rgba(193, 230, 207, 1)' : dat.status === 'DECLINED' ? 'rgba(252, 186, 190, 1)' : 'inherit',
                        }}
                      >
                        {dat.status}
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
