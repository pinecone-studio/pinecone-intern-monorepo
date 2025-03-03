import { SmallHouseIcon } from '@/components/layout/icons/SmallHouseIcon';
import { SizeIcon } from '../layout/icons/SizeIcon';
import { RoomIcon } from '../layout/icons/RoomIcon';
import { BathIcon } from '../layout/icons/BathIcon';
import { GetPostByIdQuery, PostStats, useRequestChangeStatusMutation } from '@/generated';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface AdminSinglePageProps {
  property: GetPostByIdQuery['getPostById'];
}

export const AdminSideInfo = ({ property }: AdminSinglePageProps) => {
  const [updatePostStatus] = useRequestChangeStatusMutation();

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as PostStats;
    await updatePostStatus({
      variables: {
        input: {
          status: newStatus,
        },
        id: property?._id,
      },
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[435px] mx-auto">
        <Carousel>
          <CarouselContent>
            {property.propertyDetail.images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: 435,
                    height: 292,
                    borderRadius: '8px 8px 0 0',
                  }}
                ></div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="w-[435px] p-4 bg-[#fbfbfc] rounded-b-lg">
          <div>
            <p>{property?.price}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <SmallHouseIcon />
            <p>{property?.title}</p>
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex gap-2 items-center">
              <SizeIcon />
              <p>{property?.propertyDetail?.size}м²</p>
            </div>
            <div className="flex gap-2 items-center">
              <RoomIcon />
              <p>{property?.propertyDetail?.totalRooms}</p>
            </div>
            <div className="flex gap-2 items-center">
              <BathIcon />
              <p>{property?.propertyDetail?.restrooms} а.ц.ө</p>
            </div>
          </div>
        </div>
        <div className="w-[435px] mt-4 p-6 rounded-lg bg-[#fbfbfc]">
          <p>Төлөв</p>
          <select role="status" onChange={handleStatusChange} className="py-2 px-3 w-[372px] border border-[#71717A] rounded-sm mt-2" defaultValue={property?.status as string}>
            <option value="PENDING">Хүлээгдэж буй</option>
            <option role="approved" value="APPROVED">
              Зөвшөөрөх
            </option>
            <option value="DECLINED">Татгалзах</option>
          </select>
        </div>
      </div>
    </div>
  );
};
