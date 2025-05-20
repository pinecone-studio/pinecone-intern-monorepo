'use client';
import AdminListingTable, { Listing } from './_components/AdminListingTable';

const AdminPage = () => {
  const statuses = ['Хүлээгдэж буй', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];

  const listings: Listing[] = new Array(12).fill(null).map((_, i) => ({
    id: `${i + 1}`.padStart(4, '0'),
    name: `Зар #${i + 1}`,
    owner: `Эзэмшигч ${i + 1}`,
    phone: `9911${String(1000 + i).slice(-4)}`,
    image: '/listingcard.png',
    status: statuses[i % 4],
  }));

  return <AdminListingTable listings={listings} />;
};

export default AdminPage;
