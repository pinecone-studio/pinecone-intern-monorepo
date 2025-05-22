import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

const UserHeader = () => {
  return (
    <header className="w-full flex  justify-center items-center mt-3 border-b p-[16px]" style={{ borderColor: '#E4E4E7', alignSelf: 'stretch' }}>
      <div className="flex justify-between items-center w-[1280px]">
        <div>
          <Link href="/">
            <Image src="/tinder.svg" width={100} height={25} alt="header-image" />
          </Link>
        </div>

        <div className="flex items-center gap-[16px]">
          <Link href="/message" data-testid="message-link">
            <button>
              <MessageSquare className="h-[16px] w-[16px] mt-[15px]" />
            </button>
          </Link>

          <Link href="/profile" data-testid="profile-link">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/header.svg" alt="header-image" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
