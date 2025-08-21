interface AdminHeaderProps {
  _activeTab: string;
  _setActiveTab: (_tab: string) => void;
}

export const AdminHeader = ({ _activeTab, _setActiveTab }: AdminHeaderProps) => {
  return (
    <header className="w-full mt-4 px-6 bg-white">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img
            src="https://media.gettyimages.com/id/156303396/nl/foto/nerd-student-making-a-funny-smiling-face.jpg?s=2048x2048&w=gi&k=20&c=1cNfJMBwkqDDzcFcdbGW6AYg0waGFQLpFNHD2jDIm4w="
            alt="Admin avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>
      </div>
    </header>
  );
};