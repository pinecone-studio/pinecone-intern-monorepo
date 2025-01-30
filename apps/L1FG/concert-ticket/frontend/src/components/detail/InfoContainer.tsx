import ComboBox from './ComboBox';
// import HadnleComboBox from './HandleComboBox';

const InfoContainer = () => {
  return (
    <div className="flex mx-auto w-[1250px] mt-[60px]">
      <div className="flex-1 w-[566px] ">
        <div className="flex justify-between">
          <div className="flex w-[280px] h-[20px] items-center">
            <img className="w-[16px] h-[16px]" src="/calendar.svg" />
            <p className="mx-3 text-white w-[172px]">2024.11.15-11.18</p>
            <img className="w-[16px] h-[16px]" src="/time.svg" />
            <p className="mx-3 text-white w-[50px]">19:00</p>
          </div>
          <div className="flex">
            <img src="/location.svg" />
            <p className="mx-3 text-white border-b-2">UG ARENA</p>
          </div>
        </div>
        <div>
          <p className="mx-3 text-[#ced5e0] text-[14px] mb-[10px] mt-[30px]">Special Artist</p>
          <div className="ml-[15px]">
            <li className="mx-3 text-white"> ХАР ТАС </li>
            <li className="mx-3 text-white mb-[10px]">Mr.DoggS</li>
          </div>
          <p className="mx-3 text-[#ced5e0] text-[14px] mb-[10px]">Тоглолтийн цагийн хуваарь:</p>
          <div className="ml-[15px]">
            <li className="mx-3 text-white">Door open: 6pm</li>
            <li className="mx-3 text-white mb-[30px]">Music start: 22pm</li>
          </div>
        </div>
        <div className="ml-[15px]">
          <p className="text-white mb-[50px]">Stage plan:</p>
          <img src="/stage.svg" />
        </div>
      </div>
      <div className="flex-1 w-[345px] ml-[50px]">
        <p className="text-[#878686] text-[13px] leading-5">Тоглолт үзэх өдрөө сонгоно уу.</p>
        <div>
          <div>
            {/* ////////////////////////////////////////////////////////////////////////////////// */}
            {/* <Combobox /> */}
            <ComboBox />
            {/* <HadnleComboBox /> */}
            {/* ////////////////////////////////////////////////////////////////////////////////// */} 3dahi sprint deer zasah
          </div>
          <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
            <div className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9] mx-5"> </div>
            <div className="w-[277px] h-[20px] justify-between flex ">
              <p className="text-[#D9D9D9]">Арын тасалбар (123)</p>
              <p className="text-white">89 000₮</p>
            </div>
          </div>
          <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
            <div className="w-[7px] h-[7px] rounded-full bg-[#4651C9] mx-5"> </div>
            <div className="w-[277px] h-[20px] justify-between flex ">
              <p className="text-[#4651C9]">VIP тасалбар (38)</p>
              <p className="text-white">129 000₮</p>
            </div>
          </div>
          <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
            <div className="w-[7px] h-[7px] rounded-full bg-[#C772C4] mx-5"> </div>
            <div className="w-[277px] h-[20px] justify-between flex ">
              <p className="text-[#C772C4]">Энгийн тасалбар (38)</p>
              <p className="text-white">159 000₮</p>
            </div>
          </div>
          <button className=" w-[345px] h-[36px] bg-[#00B7F4] items-center justify-center hover:bg-[#3279e3] text-[14px] rounded-md my-4">Тасалбар захиалах</button>
        </div>
      </div>
    </div>
  );
};
export default InfoContainer;
