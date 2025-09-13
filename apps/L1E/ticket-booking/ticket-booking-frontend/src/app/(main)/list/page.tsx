import { ConcertsHome } from '@/components/ConcertsHome';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SearchConcert } from '@/components/SearchConcert';

const ListPage = () => {
    return (
        <div className='bg-[#09090B] min-h-screen'>
            <Header />

            <div className='py-12 px-[117px]'>
                <SearchConcert />
                <ConcertsHome />
            </div>

            <hr />

            <Footer />
        </div>
    );
};

export default ListPage;
