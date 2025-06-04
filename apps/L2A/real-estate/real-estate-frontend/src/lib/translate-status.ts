import { Listing } from '@/app/user-listing/_components/UserListingTable';

export function translateStatus(status: string): Listing['status'] {
  const statusMap: Record<string, Listing['status']> = {
    PENDING: 'Хүлээгдэж буй',
    SALE: 'Зарагдаж байгаа',
    SOLD: 'Зарагдсан',
    DECLINED: 'Буцаагдсан',
    SAVED: 'Хадгалсан',
  };
  return statusMap[status?.toUpperCase()] ?? 'Хүлээгдэж буй';
}
