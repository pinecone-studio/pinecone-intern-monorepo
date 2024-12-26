const Footer = () => {
  return (
    <div className="absolute w-screen flex justify-center items-center bottom-8 ">
      <div className="max-w-[1380px] w-screen flex items-center justify-between">
        <div className="flex items-center">
          <img className="w-[100px] h-[24px]" src="fl.png" alt="" />
        </div>
        <div className="flex w-[148px] text-[#b9b9b9] h-[20px]">
          <div>© Copyright 2024</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
