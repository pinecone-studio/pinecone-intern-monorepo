import React from 'react';
import Image from 'next/image';
import EditIcon from '@/components/myEstate/EditIcon';
import TrashIcon from '@/components/myEstate/TrashIcon';
import { PostStats } from '@/generated';

interface PostPreview {
  __typename?: 'Post';
  _id: string;
  title: string;
  description: string;
  price: string;
  status?: PostStats | null | undefined;
  updatedAt?: string | null;
  createdAt?: string | null;
  propertyOwnerId: {
    _id: string;
  };
  propertyDetail: {
    __typename?: 'Property';
    images: string[];
  };
}

interface EstateListItemProps {
  post: PostPreview;
  index: number;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
  statusStyleMap: Record<string, string>;
  statusLabelMap: Record<string, string>;
  formatPrice: (_price: string) => string;
}

const EstateListItem = ({ post, index, onEdit, onDelete, statusStyleMap, statusLabelMap, formatPrice }: EstateListItemProps) => (
  <div className="bg-white hover:bg-gray-50 border-b border-zinc-200" data-cy="estate-list-item">
    <div className="flex items-center p-4">
      <div className="w-16 text-gray-500 font-medium border-r border-zinc-200" data-cy="item-index">
        {index + 1}.
      </div>
      <div className="flex-[2] font-medium flex items-center gap-4 border-r border-zinc-200 px-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <Image src={post.propertyDetail.images?.[0] || '/placeholder.png'} alt={post.title} fill className="object-cover" data-cy="estate-image" />
        </div>
        <span data-cy="estate-title">{post.title}</span>
      </div>
      <div className="flex-1 border-r border-zinc-200 px-4">
        {post.status && (
          <span className={`px-3 py-1 rounded-full text-sm font-bold inline-block ${statusStyleMap[post.status] || statusStyleMap.REJECTED}`} data-cy="estate-status">
            {statusLabelMap[post.status] || statusLabelMap.REJECTED}
          </span>
        )}
      </div>
      <div className="flex-1 text-black border-r border-zinc-200 px-4" data-cy="estate-price">
        {formatPrice(post.price)}₮
      </div>
      <div className="w-24 flex items-center gap-2 px-4" data-cy="action-buttons">
        <button onClick={() => onEdit(post._id)} className="p-2 hover:bg-gray-100 rounded-full" data-testid="edit-button">
          <EditIcon />
        </button>
        <button onClick={() => onDelete(post._id)} className="p-2 hover:bg-gray-100 rounded-full" data-testid="delete-button">
          <TrashIcon />
        </button>
      </div>
    </div>
  </div>
);

export default EstateListItem;
