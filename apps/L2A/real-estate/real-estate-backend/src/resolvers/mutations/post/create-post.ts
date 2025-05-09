import { CreatePostInput } from "../../../generated";
import { POST_MODEL } from "../../../models/post";
export const createPost = async (_: any, args: { input: CreatePostInput }) => {
  const {
    propertyOwnerId,
    title,
    description,
    price,
    images,
    type,
    size,
    totalRooms,
    garage,
    restrooms,
    location,
    completionDate,
    windowsCount,
    windowType,
    roofMaterial,
    floorNumber,
    balcony,
    totalFloors,
    lift,
  } = args.input;

  const newPost = await POST_MODEL.create({
    propertyOwnerId,
    title,
    description,
    price,
    images,
    type,
    size,
    totalRooms,
    garage: garage || false,
    restrooms,
    location,
    completionDate,
    windowsCount,
    windowType,
    roofMaterial,
    floorNumber,
    balcony,
    totalFloors,
    lift,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newPost;
};



