/* eslint-disable complexity */
'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { GetPostByIdQuery, UpdatePostInput, useUpdatePostByIdMutation } from '@/generated';

type Props = {
  value: string;
  onChange: (_: string) => void;
  id: string;
  post?: GetPostByIdQuery['getPostById'];
};

const statusMap: Record<string, 'PENDING' | 'APPROVED' | 'DECLINED'> = {
  'Хүлээгдэж буй': 'PENDING',
  'Зөвшөөрөх': 'APPROVED',
  'Татгалзах': 'DECLINED',
};

const StatusSelect = ({post, value, onChange, id }: Props) => {
  const statuses = ['Хүлээгдэж буй', 'Зөвшөөрөх', 'Татгалзах'];
  const [statusChanged, setStatusChanged] = useState(false);
  const prevValue = useRef(value);

  const [updatePostStatus] = useUpdatePostByIdMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus !== value) {
      onChange(newStatus);
      try {
    await updatePostStatus({
  variables: {
    id,
    input: {
      status: statusMap[newStatus] as UpdatePostInput['status'],
      propertyOwnerId: post?.propertyOwnerId ?? '',
    },
  },
});
      } catch (err) {
        console.error('Status update error:', err);
      }
    }
  };
  useEffect(() => {
    if (prevValue.current !== value) {
      setStatusChanged(true);
      prevValue.current = value;

      const timer = setTimeout(() => setStatusChanged(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <select
       value={value}
        onChange={handleChange}
        className="border px-3 py-1.5 rounded-md text-sm w-full"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {statusChanged && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-lg animate-fade-in-out">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-gray-900">Төлөв амжилттай солигдлоо</p>
            <p className="text-sm text-gray-500">Thank you for your review!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
