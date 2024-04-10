import * as React from 'react';
import Button from '@mui/material/Button';
import { connectToDatabase } from '@/config/connect-to-database';

const AdminDashboard = () => {
  connectToDatabase()
  return (
    <>
      <div>sans undertale</div>
      <Button variant="contained">Hello world</Button>
    </>
  );
};
export default AdminDashboard;
