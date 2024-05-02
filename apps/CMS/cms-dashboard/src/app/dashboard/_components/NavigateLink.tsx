'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigateLinkProps = {
  text: string;
  myPathName: string;
};

export const NavigateLink = (props: NavigateLinkProps) => {
  const pathName = usePathname();
  const { text, myPathName } = props;
  return (
    <Link
      href={myPathName}
      data-testid="navigate-link-test-id"
      className="h-full font-semibold text-textPrimary rounded-[50px] cursor-pointer flex justify-center items-center px-8"
      style={{ backgroundColor: pathName === myPathName ? '#1c202414' : '' }}
    >
      <p>{text}</p>
    </Link>
  );
};
