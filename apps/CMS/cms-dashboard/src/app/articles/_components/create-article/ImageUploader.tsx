'use client';
import CreateArticleIcon from "../icons/CreateArticleIcon";

const ImageUploader = ()=> {
    return (
        <div data-testid="imageUploader" className=" flex p-6 flex-col gap-4">
            <p className=" text-lg">Өнгөц зураг</p>
            <label htmlFor="input">   
            <div className=" flex flex-col px-[72px] py-9 justify-center items-center gap-2 rounded-xl bg-[#F7F7F8]">
     
                <CreateArticleIcon/>
                <p className="">Зураг оруулах</p>
                <p className="text-xs text-[#5E6166]">Хэмжээ 928x4271</p>
        
                <input id="input"  type="file" accept="image/*" hidden/>   
           
            </div>
            </label>
        </div> 
    );
}
export default ImageUploader;