import cloudynary from './cloudynary.json';
const Logo = () => {
  return (
    <>
      <img src={cloudynary.image} alt="img " data-testid="Logo-image" />
    </>
  );
};
export default Logo;
