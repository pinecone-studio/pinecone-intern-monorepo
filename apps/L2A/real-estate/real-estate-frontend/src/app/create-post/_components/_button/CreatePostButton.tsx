import { CreatePostButtonImages } from "./CreatePostButtonImages";
import { CreatePostInfo } from "./CreatePostInfo";

type Props = {
  images?: string[];
  title: string;
  price: string;
  area: string;
  rooms: string;
  restrooms: string;
  location: string;
  onSubmit: () => void; 
};

export const CreatePostButton = ({ 
  images = [], 
  title, 
  price, 
  area, 
  rooms, 
  restrooms, 
  location, 
  onSubmit
}: Props) => {
  return (
    <div className="h-[600px] flex flex-col gap-4 rounded-lg">
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
            title={title} 
            price={price} 
            area={area} 
            rooms={rooms} 
            restrooms={restrooms} 
            location={location} 
          />
        </div>
      </div>
      <button 
       data-testid="button"
       data-cy="create-post-button"
        type="submit"  
        onClick={onSubmit} 
        className="bg-[#F97316] text-[#FAFAFA] p-2 rounded-lg"
      >
        Зар оруулах хүсэлт илгээх
      </button>

    </div>
  );
};

