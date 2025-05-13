import Container from './_components/Container';
import Footer from './_components/Footer';
import Header from './_components/Header';

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/homeBackground.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'cover',
        minHeight: '100vh',
        color: '#FAFAFA',
      }}
      className="flex  flex-col  items-center gap-6 "
    >
      <Header />
      <Container />
      <Footer/>
    </div>
  );
};

export default Page;
