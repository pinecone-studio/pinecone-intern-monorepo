import { CreatePostButtonImages } from "./CreatePostButtonImages";
import { CreatePostInfo } from "./CreatePostInfo";
import { CreatePostSaved } from "./CreatePostSaved";

type Props = {
  images?: string[];
  name: string;
  price: string;
  area: string;
  rooms: string;
  restrooms: string;
  location: string;
  onSaveDraft: () => void;
  onSubmit: () => void; 
};

export const CreatePostButton = ({ 
  images = [], 
  name, 
  price, 
  area, 
  rooms, 
  restrooms, 
  location, 
  onSaveDraft,
  onSubmit
}: Props) => {
  return (
    <div data-testid="button" className="h-[800px] flex flex-col gap-4 rounded-lg">
      <div>
        <div className="text-[#09090B]">Хэрэглэгчдэд харагдах</div>
        <div className="text-[#71717A]">Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт</div>
      </div>
      <div className="w-full bg-[#FFFFFF] relative mt-3 aspect-[3/4] rounded-md overflow-hidden">
        <div className=" flex flex-col gap-4 rounded-lg">
          <CreatePostButtonImages images={images} />
        </div>
        <div className="mt-3 px-3">
          <CreatePostInfo 
            name={name} 
            price={price} 
            area={area} 
            rooms={rooms} 
            restrooms={restrooms} 
            location={location} 
          />
        </div>
      </div>
      <button 
        type="button"  
        onClick={onSubmit} 
        className="bg-[#F97316] text-[#FAFAFA] p-2 rounded-lg"
      >
        Зар оруулах хүсэлт илгээх
      </button>
      <CreatePostSaved onSaveDraft={onSaveDraft} />
    </div>
  );
};

