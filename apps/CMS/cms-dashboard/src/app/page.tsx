'use client';
import { TableContent } from './dashboard/_components/TableContent';
import { FooterButtons } from './dashboard/_features';

const Home = () => {
  // const [userRole, setUserRole] = useState<string>('user');

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = jwt.decode(token) as JwtPayloadType;
  //     setUserRole(decodedToken?.role ?? 'user');
  //   }
  // }, []);

  // style={{ display: userRole === 'user' ? 'none' : 'flex' }}

  return (
    <div>
      <TableContent />
      <div className="flex justify-center py-6 sticky bottom-0">
        <FooterButtons />
      </div>
    </div>
  );
};

export default Home;
