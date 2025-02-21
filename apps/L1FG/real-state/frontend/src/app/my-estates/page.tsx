'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers';
import { useDeletePostMutation, useGetPostsByUserIdQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import EstateListItem from '@/components/addEstate/assests/EstateListItem';
import DeleteConfirmModal from '@/components/addEstate/assests/DeleteConfirmModal';
import LoadingErrorDisplay from '@/components/addEstate/assests/LoadingErrorDisplay';
import { toast } from 'react-toastify';

const statusLabelMap: Record<string, string> = {
  PENDING: 'Хүлээгдэж буй',
  APPROVED: 'Зарагдаж байгаа',
  REJECTED: 'Буцаагдсан',
};
const statusStyleMap: Record<string, string> = {
  PENDING: 'bg-[rgba(37,99,235,0.1)] text-[rgba(37,99,235,1)]',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const formatPrice = (price: string): string => {
  return new Intl.NumberFormat('mn-MN').format(Number(price));
};

const TableHeader: React.FC = () => (
  <div className="flex items-center bg-gray-50 p-4 border-b border-zinc-200">
    <div className="w-16 text-black font-medium border-r border-zinc-200">№</div>
    <div className="flex-[2] text-black font-medium border-r border-zinc-200 px-4">Нэр</div>
    <div className="flex-1 text-black font-medium border-r border-zinc-200 px-4">Төлөв</div>
    <div className="flex-1 text-black font-medium border-r border-zinc-200 px-4">Үнэ</div>
    <div className="w-24 px-4" />
  </div>
);

const MyEstatesPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState('');

  const { data, loading, error, refetch } = useGetPostsByUserIdQuery({
    variables: { input: { propertyOwnerId: user?._id } },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      toast.warning('Та нэвтэрч орно уу');
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch, user?._id]);

  const [deletePost] = useDeletePostMutation({
    onCompleted: () => {
      toast.success('Зар амжилттай устгагдлаа');
      refetch();
      setShowModal(false);
    },
    onError: () => {
      toast.error('Зар устгахад алдаа гарлаа');
      setShowModal(false);
    },
  });

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    deletePost({ variables: { id: postToDelete } });
  };

  const handleEdit = (id: string) => {
    router.push('/my-estates/' + id);
  };

  if (loading || error) {
    return <LoadingErrorDisplay loading={loading} error={error} />;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Миний зарууд</h1>
        <div className="border border-zinc-200 rounded-lg overflow-hidden">
          <TableHeader />
          <div>
            {data?.getPosts?.map((post, index) => (
              <EstateListItem
                key={post._id}
                post={post}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                statusStyleMap={statusStyleMap}
                statusLabelMap={statusLabelMap}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </main>

      {showModal && <DeleteConfirmModal onClose={() => setShowModal(false)} onConfirm={handleDelete} />}
    </>
  );
};

export default MyEstatesPage;
