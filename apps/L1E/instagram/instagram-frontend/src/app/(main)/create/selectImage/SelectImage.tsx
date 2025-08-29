"use client"
import Image from "next/image";
  import { Button } from "@/components/ui/button";
   const SelectImagePage: React.FC = () => {
  
  const handleSelectFromComputer = () => {
    const input = document.getElementById("global-image-input") as HTMLInputElement;
    if (input) {
      input.value = ""; 
      input.click();
    }
  };

  return (
    <div>
      <div className="flex flex-col w-[638px] h-[678px] items-center gap-[196px]">
        <div className="h-[49px] flex flex-col items-center pt-[4px] pb-[4px] gap-[4px]">
          <h2 className="text-[16px] font-normal text-center  w-full h-[24px]  ">
            Create New Post
          </h2>
          <hr className="w-[638px] h-[25px] flex flex-col gap-[10px] p-[8px_0px_16px_0px]" />
        </div>
        <div className="h-[175px] rounded-lg p-8 text-center flex flex-col items-center justify-center">

                    <label
                      htmlFor="global-image-input"
                      className="cursor-pointer flex flex-col items-center justify-center h-full"
                    >
                      <Image src="/filedrop.svg" alt="Upload Icon" width={96} height={77} />
                      <p className="mt-2 text-[20px] font-[400]">Drag photos and videos here</p>
                    </label>
                    <Button
                      variant="outline"
                      className="mt-2 bg-blue-400 w-[178px] h-[40px] p-[8px_16px] hover:bg-blue-500 text-white"
                       onClick={handleSelectFromComputer}
                    >
                      Select from computer
                    </Button>
                  </div>
                </div>
    </div>
  );
}

export default SelectImagePage;
