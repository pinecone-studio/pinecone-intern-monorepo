import Link from 'next/link';

const Footer = () => {
  return (
    <Link href={'/login'}>
      <div data-cy="Button" className="backdrop-blur-sm bg-white/30 sticky bottom-0 w-[100vw] h-[84px] flex justify-center items-center">
        <div className="w-[80%] bg-[#441500] h-[36px] rounded-md text-[14px] font-semibold flex justify-center items-center text-[#FAFAFA]">Захиалах</div>
      </div>
    </Link>
  );
};
export default Footer;
