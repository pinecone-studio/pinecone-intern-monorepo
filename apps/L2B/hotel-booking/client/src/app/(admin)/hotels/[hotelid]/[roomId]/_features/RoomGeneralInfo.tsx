'use client';
import { useState, useCallback } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { RoomType, useUpdateRoomMutation } from '@/generated';
import { RoomGeneralInfoForm } from './RoomGeneralComponents';
import { Room, RoomFormData } from '@/utils/type';

const getName = (room: Room) => room.name ?? '';
const getType = (room: Room) => room.type ?? RoomType.Single;
const getPrice = (room: Room) => room.pricePerNight ?? 0;
const getRoomNumber = (room: Room) => room.roomNumber ?? 0;
const getAvailability = (room: Room) => room.isAvailable ?? false;
const getInformation = (room: Room) => room.information ?? [];

const getInitialFormData = (room: Room): RoomFormData => ({
  name: getName(room),
  type: getType(room),
  pricePerNight: getPrice(room),
  roomNumber: getRoomNumber(room),
  isAvailable: getAvailability(room),
  information: getInformation(room),
});

const useRoomFormState = (room: Room) => {
  const [formData, setFormData] = useState<RoomFormData>(getInitialFormData(room));
  const [information, setInformation] = useState<string[]>(getInformation(room));

  return { formData, setFormData, information, setInformation };
};

const RoomDetailsSection = ({ room }: { room: Room }) => {
  const roomDetails = [
    { label: 'Name', value: room.name || '-/-' },
    { label: 'Type', value: room.type || '-/-' },
    { label: 'Price', value: room.pricePerNight ? `${room.pricePerNight}₮` : '-/-' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6" data-cy="room-details-section">
      {roomDetails.map((detail) => (
        <div key={detail.label} data-cy={`room-detail-${detail.label.toLowerCase()}`}>
          <h6 className="text-sm text-gray-500">{detail.label}</h6>
          <p className="text-sm font-medium">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};

const InformationSection = ({ information }: { information: string[] }) => (
  <div data-cy="information-section">
    <h6 className="text-sm text-gray-500 mb-2">Information</h6>
    {information.length ? (
      <div className="grid grid-cols-3 gap-2">
        {information.map((info) => (
          <div key={info} className="flex items-center gap-2 text-sm" data-cy={`information-item-${info.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="text-green-600">✓</span>
            <span>{info}</span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500" data-cy="no-information-text">
        -/-
      </p>
    )}
  </div>
);

export const RoomGeneralInfo = ({ roomId, room }: { roomId: string; room: Room }) => {
  const [updateRoom] = useUpdateRoomMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, information, setInformation } = useRoomFormState(room);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await updateRoom({
        variables: {
          updateRoomId: roomId,
          input: {
            name: formData.name,
            type: formData.type,
            pricePerNight: formData.pricePerNight,
            roomNumber: formData.roomNumber,
            isAvailable: formData.isAvailable,
            information: information,
          },
        },
        refetchQueries: ['room'],
      });
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }, [roomId, formData, information, updateRoom]);

  return (
    <div className="w-full bg-white rounded-lg border p-6" data-cy="room-general-info">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">General Info</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="text-blue-600 text-sm font-medium" data-cy="edit-general-info-button">
            Edit
          </DialogTrigger>
          <RoomGeneralInfoForm formData={formData} setFormData={setFormData} information={information} setInformation={setInformation} onSave={handleSave} loading={loading} />
        </Dialog>
      </div>
      <div className="border-b my-4"></div>
      <div className="space-y-6">
        <RoomDetailsSection room={room} />
        <InformationSection information={information} />
      </div>
    </div>
  );
};
