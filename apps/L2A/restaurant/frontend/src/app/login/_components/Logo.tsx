import Image from 'next/image';
import cloudynary from './cloudynary.json';
const Logo = () => {
  return (
    <>
      <Image width={36} height={36} src={cloudynary.image} alt="img " data-testid="Logo-image" />
    </>
  );
};
export default Logo;
