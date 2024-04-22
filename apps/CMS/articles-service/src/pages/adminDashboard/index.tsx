import * as React from 'react';
import Button from '@mui/material/Button';
import { connectToDatabase } from '@/config/connect-to-database';

const AdminDashboard = () => {
  connectToDatabase()
  console.log("test")
  return (
    <>
      <div>test</div>
      <Button variant="contained">Hello world</Button>
    </>
  );
};
export default AdminDashboard;
