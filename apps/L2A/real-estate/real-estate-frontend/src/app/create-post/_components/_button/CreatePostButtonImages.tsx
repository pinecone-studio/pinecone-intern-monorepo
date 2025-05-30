type Props = {
    images?: string[];
  };
  
  export const CreatePostButtonImages = ({ images = [] }: Props) => {
    return (
      <div className="bg-[#E4E4E7]">
        {images.length > 0 ? (
          <div>
            <img src={images[0]} alt="preview" className="w-full h-[292.5px] object-cover" />
            <div className="absolute top-2 right-2 bg-[#F4F4F5] text-xs px-3 py-1 rounded-full">
              1/{images.length}
            </div>
          </div>
        ) : (
          <div data-testid="placeholder" className="w-full h-[292.5px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
    );
  };
  ;
  
  