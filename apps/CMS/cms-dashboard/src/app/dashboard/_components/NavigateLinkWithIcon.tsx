'use client';
import Link from 'next/link';
type NavigateLinkWithIconProps = {
  text: string;
  myPathName: string;
  icon?: JSX.Element;
};

export const NavigateLinkWithIcon = (props: NavigateLinkWithIconProps) => {
  const { text, myPathName, icon } = props;
  return (
    <Link href={myPathName} data-testid="navigate-link-with-icon-test-id" className="h-full font-semibold  rounded-[50px] cursor-pointer flex justify-center items-center bg-[black]">
      <div className="flex flex-row justify-center items-center gap-2 px-6 text-white">
        {icon}
        <p>{text}</p>
      </div>
    </Link>
  );
};
