import { useEffect, useState } from 'react';
import PhotoOutlinedIcon from '../assets/PhotoOutlinedIcon';
import * as yup from 'yup';
import { useFormik } from 'formik';
import SectionInputForm from '../_components/SectionInputForm';
import SectionForm from '../_components/SectionForm';
import DeleteIcon from '../assets/DeleteIcon';
import EditIcon from '../assets/EditIcon';

interface FormValues {
  title: string;
  description: string;
  contentImage: string;
}

const AddSection = () => {
  const [sections, setSections] = useState<FormValues[]>([]);

  useEffect(() => {
    const storedSections = localStorage.getItem('sections');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    }
  }, []);

  const validationSchema = yup.object({
    title: yup.string().required('Хичээлийн гарчиг оруулна уу...'),
    description: yup.string().required('Дэлгэрэнгүй мэдээлэл оруулна уу...'),
    contentImage: yup.string(),
  });

  const handleAddSection = (values: FormValues) => {
    setSections([...sections, values]);
  };

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      contentImage: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleAddSection(formik.values);
      formik.resetForm();
    },
  });

  return (
    <div className='flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6 ' data-testid='add-section-component'>
      <div>
        {sections.map((section: FormValues, index) => (
          <SectionForm title={section.title} description={section.description} key={index} />
        ))}
      </div>

      <div className='flex flex-col gap-4 border-2 border-dashed rounded-[4px] p-8 border-[#D6D8DB] rounded-[8px]'>
        <SectionInputForm
          name='title'
          label='Хичээлийн гарчиг'
          type='text'
          placeholder='Оруулна уу'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <SectionInputForm
          name='description'
          label='Дэлгэрэнгүй'
          type='text'
          placeholder='Энд бичнэ үү'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <div>
          <p className='font-bold'> Хичээлийн зураг</p>
          <div className='w-[588px]  h-[240px] flex flex-col justify-center items-center rounded-[8px]  border-[2px]  border-[#D6D8DB] border-dashed'>
            <PhotoOutlinedIcon/>
            <div className='flex justify-center items-center gap-1'>
              <p className='font-bold text-[18px] text-[#3F414580]'>Зургийг чирж буулгах эсвэл</p>
              <div className='w-[80px]  relative items-center justify-center '>
                <p className='underline text-[18px] font-bold text-[#3F4145]'>Browse</p>
                <input className='absolute' id='file-test' name='image' type='file' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 items-center py-4'>
      <button className=" w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center justify-center gap-2">
          Засах <EditIcon />
        </button>
        <button className="w-[101px] bg-transparent border-2 border font-bold rounded-[12px] p-2 text-black flex items-center judtify-center gap-2">
          Устгах <DeleteIcon />
        </button>
        <hr className='color-black' />
        <button
          data-cy='add-section-handle-btn'
          onClick={() => {
            formik.handleSubmit();
          }}
          className='w-[36px] bg-black h-[36px] text-white rounded-[8px] flex items-center justify-center text-[26px] pb-2'
          disabled={!formik.isValid}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddSection;
