import React from 'react';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ onClose, onConfirm }: DeleteConfirmModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-cy="delete-modal-overlay">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4" data-cy="delete-modal-content">
      <h3 className="text-lg font-medium mb-4" data-cy="delete-modal-title">
        Та энэ зарыг устгахдаа итгэлтэй байна уу?
      </h3>
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50" data-cy="cancel-delete">
          Үгүй
        </button>
        <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" data-cy="confirm-delete">
          Тийм
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
