import { MdOutlineNotificationsActive } from 'react-icons/md';

const notifications = [
  {
    id: '#32193',
    message: 'Таны захиалсан хоол бэлтгэгдлээ.',
    status: 'Хүлээгдэж буй',
    date: '24.10.19 15:25',
  },
  {
    id: '#32194',
    message: 'Таны захиалга бэлэн боллоо.',
    status: 'Бэлэн',
    date: '24.10.19 16:00',
  },
  {
    id: '#32195',
    message: 'Таны захиалга хүлээгдэж байна.',
    status: 'Хүлээгдэж буй',
    date: '24.10.19 16:30',
  },
];

export const Notification = () => {
  return (
    <div className="max-w-sm mx-auto rounded-xl p-4" data-testid="notification-container">
      <div className="p-4 border-b" data-testid="notification-header">
        <h2 className="text-xl font-semibold">Мэдэгдэл</h2>
      </div>
      <div className="mt-5 space-y-2" data-testid="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-3 bg-white rounded-lg border flex items-start gap-3" data-testid={`notification-${notification.id}`}>
            <div className="bg-gray-200 rounded-full w-9 h-9 flex justify-center items-center" data-testid={`notification-icon-${notification.id}`}>
              <MdOutlineNotificationsActive className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-[#3F4145] font-bold" data-testid={`notification-id-${notification.id}`}>
                  {notification.id}
                </p>
              </div>
              <p className="text-sm text-[#3F4145]" data-testid={`notification-message-${notification.id}`}>
                {notification.message}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-black px-2 py-0.5 rounded-full border" data-testid={`notification-status-${notification.id}`}>
                  {notification.status}
                </span>
                <p className="text-xs text-gray-500 text-right" data-testid={`notification-date-${notification.id}`}>
                  {notification.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
