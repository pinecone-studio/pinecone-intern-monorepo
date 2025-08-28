'use client';
import HomePageContainer from '@/components/home/HomePageContainer';
import { Navbar } from '@/components/Navbar';
import jwt from 'jsonwebtoken';
const token = localStorage.getItem('token');
const decoded = jwt.decode(token!);
console.log(decoded);

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomePageContainer />
    </div>
  );
};

export default Home;
