import { GetPostByIdQuery } from '@/generated';

interface AdminSinglePageProps {
  property: GetPostByIdQuery['getPostById'];
}

export const AdminPictures = ({ property }: AdminSinglePageProps) => {
  return (
    <div className="w-[736px]  p-6 rounded-lg bg-[#fbfbfc] mt-8 ">
      <div>
        <h4 className="text-[20px] font-semibold">Зураг</h4>
      </div>
      <div className="gap-4 grid grid-cols-3 mt-8">
        {property?.propertyDetail.images.map((image, index) => (
          <img key={index} src={image} className="w-[218px] h-[123px] rounded-sm " />
        ))}
      </div>
    </div>
  );
};
