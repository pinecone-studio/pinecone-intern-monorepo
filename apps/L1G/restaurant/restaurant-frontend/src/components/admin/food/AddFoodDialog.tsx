import { useCreateFoodMutation } from '@/generated';
import { formSchemaFood } from '@/utils/form-schemas';
import { uploadImage } from '@/utils/image-upload';
import { z } from 'zod';
import { EditDialog } from './EditDialog';
import { Plus } from 'lucide-react';

export const AddFoodDialog = () => {
  const [createFood] = useCreateFoodMutation();
  const handleCreateButton = async (values: z.infer<typeof formSchemaFood>) => {
    console.log(values);
    if (!values.image) {
      console.log('error');
      return;
    }
    const imageUrl = await uploadImage(values.image);
    try {
      await createFood({
        variables: {
          input: {
            foodName: values.foodName,
            price: values.price,
            status: values.status,
            image: imageUrl,
            categoryId: values.category,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <EditDialog
        title="Хоол нэмэх"
        submitText="Үүсгэх"
        children={
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm leading-[20px] font-medium text-[#09090B]">Хоол</p>
            <Plus className="w-4 h-4" />
          </div>
        }
        onSubmit={(values) => handleCreateButton(values)}
      />
    </div>
  );
};
