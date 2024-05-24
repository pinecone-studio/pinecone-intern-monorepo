import Link from 'next/link';

export const CancelButton = () => {
  return (
    <Link href={'/dashboard'}>
      <button className="btn w-full h-14 text-lg font-semibold bg-[#888] text-white hover:text-black">Болих</button>
    </Link>
  );
};
