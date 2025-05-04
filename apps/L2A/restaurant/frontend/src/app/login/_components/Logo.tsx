import Image from 'next/image';
import cloudynary from './cloudynary.json';
import Link from 'next/link';
const Logo = () => {
  return (
    <>
      <Link href={'/'}>
        <Image width={36} height={36} src={cloudynary.image} alt="img " data-testid="Logo-image" />
      </Link>
    </>
  );
};
export default Logo;
