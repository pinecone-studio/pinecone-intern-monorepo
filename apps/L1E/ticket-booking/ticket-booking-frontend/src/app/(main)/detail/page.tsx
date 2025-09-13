import { ConcertCoverPic } from '@/components/ConcertCoverPic';
import { ConcertsList } from '@/components/ConcertsList';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SeatsTickets } from '@/components/SeatsTickets';

const DetailPage = () => {
    return (
        <div className='bg-[#09090B] min-h-screen'>
            <Header />

            <ConcertCoverPic />
            <SeatsTickets />
            <div className='py-12 px-[117px]'>
                <ConcertsList />
            </div>

            <hr />

            <Footer />
        </div>
    );
};

export default DetailPage;
