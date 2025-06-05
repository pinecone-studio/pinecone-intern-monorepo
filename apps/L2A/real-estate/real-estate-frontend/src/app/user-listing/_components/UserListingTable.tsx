'use client';

import Image from 'next/image';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDeletePostByIdMutation } from '@/generated';

export type Listing = {
  id: string;
  name: string;
  owner: string;
  image: string;
  status: 'Хүлээгдэж буй' | 'Зарагдаж байгаа' | 'Зарагдсан' | 'Буцаагдсан' | 'Хадгалсан';
  price: string;
};

type Props = {
  listings: Listing[];
};

const statusColor = {
  'Хүлээгдэж буй': 'text-blue-600 bg-blue-50',
  'Зарагдаж байгаа': 'text-green-600 bg-green-50',
  Зарагдсан: 'text-yellow-700 bg-yellow-100',
  Буцаагдсан: 'text-red-600 bg-red-50',
  Хадгалсан: 'text-gray-700 bg-gray-100',
};

const UserListingTable = ({ listings }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletePostById] = useDeletePostByIdMutation();
  const [listingData, setListingData] = useState<Listing[]>(listings);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto text-sm border w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-2 py-2 text-left border-r w-[1%] whitespace-nowrap">ID</th>
            <th className="px-4 py-2 text-left border-r">Нэр</th>
            <th className="px-4 py-2 text-left border-r w-[150px]">Төлөв</th>
            <th className="px-4 py-2 text-left border-r w-[1%] whitespace-nowrap">Үнэ</th>
            <th className="px-4 py-2 text-center">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {listingData.map((l, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 border-r w-[1%] whitespace-nowrap">{l.id}</td>
              <td className="px-4 py-2 border-r flex items-center gap-2">
                <Image src={l.image} alt="img" width={40} height={40} className="rounded-md object-cover" />
                {l.name}
              </td>
              <td className="px-4 py-2 border-r">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
              </td>
              <td className="px-4 py-2 border-r">{l.price}</td>
              <td className="px-6 py-2 text-center w-[1%] whitespace-nowrap">
                <div className="flex justify-center gap-6">
                  <Link className="flex justify-center gap-6" href={`/user-listing/edit/${l.id}`}>
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-all" />
                    <Pencil className="w-4 h-4 cursor-pointer hover:text-green-400 transition-all" />
                  </Link>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Trash
                       data-testid={`trash-icon-${l.id}`}
                        className="w-4 h-4 cursor-pointer hover:text-red-400 transition-all"
                        onClick={() => {
                          setSelectedId(l.id);
                          setOpen(true);
                        }}
                      />
                    </DialogTrigger>
                    <DialogContent className="w-[480px] h-[168px]" data-cy="delete-confirm-modal">
                      <DialogHeader>
                        <DialogTitle className="text-[#09090B] text-[20px]">Та устгахдаа итгэлтэй байна уу?</DialogTitle>
                        <DialogDescription className="text-[16px]">
                          Мэдээллийг устгаснаар дахин сэргээх боломжгүй
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpen(false)}
                          data-cy="cancel-delete-button"
                        >
                          Болих
                        </Button>
                        <Button
                          variant="destructive"
                           onClick={async () => {
                             // istanbul ignore next
              if (selectedId) {
                try {
                  await deletePostById({ variables: { id: selectedId } });
                 
                  setListingData(prev =>
                    prev.filter(post => post.id !== selectedId)
                  );
                } catch (error) {
                  console.error('Алдаа гарлаа', error);
                }
                setOpen(false);
              }
            }}
          >
                          Устгах
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListingTable;
