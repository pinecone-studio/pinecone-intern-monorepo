import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeletePostMutation } from '@/generated';
import { toast } from 'react-toastify';

const DeleteSection = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await deletePost({ variables: { id: postId } });
      if (data?.deletePost) {
        toast.success('Зар амжилттай устгагдлаа');
        router.push('/my-estates');
      } else {
        toast.error('Зар устгахад алдаа гарлаа');
      }
    } catch {
      toast.error('Зар устгахад алдаа гарлаа');
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)} className="w-full px-6 py-2 text-black rounded-md" data-cy="delete-post">
        Устгах
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-cy="delete-modal-overlay">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Та энэ зарыг устгахдаа итгэлтэй байна уу?</h3>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50">
                Үгүй
              </button>
              <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" data-cy="confirm-delete">
                Тийм
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteSection;
