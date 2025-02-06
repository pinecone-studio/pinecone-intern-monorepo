interface Property {
  property: {
    images: string[];
  };
}

export const AdminPictures = ({ property }: Property) => {
  return (
    <div className="w-[736px]  p-6 rounded-lg bg-[#fbfbfc] mt-8 ">
      <div>
        <h4 className="text-[20px] font-semibold">Зураг</h4>
      </div>
      <div className="gap-4 grid grid-cols-3 mt-8">
        {property.images.map((image, index) => (
          <img key={index} src={image} alt={`cover-${index}`} className="w-[218px] h-[123px] " />
        ))}
      </div>
    </div>
  );
};
