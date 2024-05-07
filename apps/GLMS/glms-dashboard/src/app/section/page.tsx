
import GetSections from './_features/GetSections';
import AddSection from './_features/AddSection';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateSectionMutation } from '@/generated';
import { useRouter } from 'next/navigation';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  contentImage:yup.string()
});

const SectionPage = () => {
  const router = useRouter();
  const [createSection] = useCreateSectionMutation()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      createSection({
        variables: {
          sectionInput : {
            title:values.title,
            description: values.description,
            contentImage:values.thumbnail
          }
        }
      })
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col justify-center bg-[#F7F7F8] px-20" data-testid="section-page-container">
      <div
        data-testid="handle-back-page" onClick={()=>router.push("dashboard")}
        className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4">
        <ArrowLeftIcon />
        <p>Нүүр</p>
      </div>
      <GetSections />
      <AddSection
       titleOnChange={formik.handleChange} 
       titleValue={formik.values.title} 
       descriptionOnChange={formik.handleChange}
       descriptionValue={formik.values.description}
       thumbnailOnChange={formik.values.thumbnail} 
       ThumbnailValue={formik.setFieldValue} 
       onClick={formik.handleSubmit}
       buttonName='Нэмэх'
      />
    </div>
  );
};

export default SectionPage;
