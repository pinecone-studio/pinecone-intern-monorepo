import { Header } from '@/components/Header';
import { CarouselConcert } from '../../components/CarouselConcert';
import { ConcertsHome } from '../../components/ConcertsHome';
import { Footer } from '../../components/Footer';
import { SearchConcert } from '../../components/SearchConcert';
import { ConcertCoverPic } from '../../components/ConcertCoverPic';
import { SeatsTickets } from '../../components/SeatsTickets';
import { ConcertsList } from '../../components/ConcertsList';

const HomePage = () => {
  return (
    <div className='bg-[#09090B] min-h-screen'>
      <Header />

      {/* Home */}

      <CarouselConcert />
      <div className='py-12 px-[117px]'>
        <ConcertsHome />
      </div>


      {/* List */}

      {/* <div className='py-12 px-[117px]'>
        <SearchConcert />
        <ConcertsList />
      </div> */}


      {/* Detail */}

      {/* <ConcertCoverPic />
      <SeatsTickets />
      <div className='py-12 px-[117px]'>
        <ConcertsList />
      </div> */}


      <hr />

      <Footer />
    </div>
  );
};

export default HomePage;
