// 'use client';

// import { useRouter } from 'next/navigation';
// // import { useHelloQueryFromArticlesServiceQuery } from '../../generated';
// import { ArticlesMain } from './_features';

// const ArticlesPage = () => {
//   // const { data } = useHelloQueryFromArticlesServiceQuery();
//   const router = useRouter();

//   const handleNavigateToHomePageButton = () => router.push('/');

//   return (
//     <div>
//       <h1>hello from CMS dashboard Articles Page</h1>
//       <h1>
//         hello from Articles Service Query
//         {/* {data?.helloQueryFromArticlesService} */}
//       </h1>
//       <ArticlesMain />
//       <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
//     </div>
//   );
// };

// export default ArticlesPage;

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Search } from '@mui/icons-material';
import { Container } from '@mui/material';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

function createData(name: string, calories: number, fat: number, carbs: number) {
  return { name, calories, fat, carbs };
}

const rows = [createData('Frozen yoghurt', 159, 6.0, 12), createData('Gingerbread', 356, 16.0, 49)];

export default function BasicTable() {
  return (
    <Container sx={{ py: 6 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }}>Нийтлэл</TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }} align="right">
                Огноо
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }} align="right">
                Статус&nbsp;
              </TableCell>
              <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#3F4145' }} align="right">
                Шошго&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
