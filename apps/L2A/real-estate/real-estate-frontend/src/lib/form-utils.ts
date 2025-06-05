import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMeQuery } from '@/generated';


export const useCreatePostFormik = () => {

  const { data: meData } = useMeQuery();
  const userId = meData?.me?.id;
  console.log('User ID:', userId);
  return useFormik({
    initialValues: {
      type: '',
      title: '',
      name: '',
      price: '',
      field: '',
      room: '',
      restroom: '',
      parking: '', 
      text: '',
      images: [],
    location: {
      address: '',
      city: '',
      district: '',
    },
    number:'',
      year: '',
      windows: '',
      window: '',
      door: '',
      floor: '',
      aptfloor: '',
      ground: '',
      balcony: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Төрлөө сонгоно уу!'),
      title: Yup.string().required('Нэр заавал оруулна уу!'),
      name: Yup.string().required('Эзэмшигчийн нэр заавал оруулна уу!'),
      price: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Үнэ заавал оруулна уу!')
        .min(0, 'Үнэ 0-ээс их байх ёстой!'),
      field: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Талбайн утгыг заавал оруулна уу!')
        .min(10, 'Талбайн утга 2-оос дээш оронтой байх ёстой!'),
      room: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Өрөөний тоог заавал оруулна уу!')
        .min(1, 'Өрөөний тоо 1-ээс их байх ёстой!'),
      restroom: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Ариун цэврийн өрөөний тоог заавал оруулна уу!')
        .min(1, 'Ариун цэврийн өрөөний тоо 1-ээс их байх ёстой!'),
      parking: Yup.string().required('Зогсоол сонгоно уу!'),
      text: Yup.string().required('Дэлгэрэнгүй тайлбар оруулна уу!'),
      images: Yup.array().min(1, 'Зураг заавал оруулна уу!'),
    location: Yup.object({
      address: Yup.string().required('Хаяг оруулна уу'),
      city: Yup.string().required('Хотын нэр оруулна уу'),
     district: Yup.string().required('Дүүргийн нэр оруулна уу'),
     }),
     number: Yup.string().required('Утасны дугаар заавал оруулна уу!'),

      year: Yup.number().required('Ашиглалтанд орсон он заавал оруулна уу!'),
      windows: Yup.number().required('Цонхны тоо заавал оруулна уу!').min(1, 'Цонхны тоо 1-ээс их байх ёстой!'),
      window: Yup.string().required('Цонхны загварыг заавал оруулна уу!'),
      door: Yup.string().required('Хаалганы загварыг заавал оруулна уу!'),
      floor: Yup.number().required('Давхар заавал оруулна уу!').min(1, 'Давхар 1-ээс их байх ёстой!'),
      aptfloor: Yup.number().required('Давхрын тоог заавал оруулна уу!').min(1, 'Давхрын тоо 1-ээс их байх ёстой!'),
      ground: Yup.string().required('Шалны загвар заавал оруулна уу!'),
      balcony: Yup.string().required('Тагтны тоо заавал оруулна уу!'),
    }),
   onSubmit: async (values, formikHelpers) => {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        _id
        title
        type
        price
      }
    }
  `;



  const variables = {
    input: {
     
      title: values.title,
      ownerName: values.name,
      location: {
        address: values.location.address,
        city: values.location.city,
        district: values.location.district,
      },
      number: values.number,
      propertyOwnerId: userId,
      description: values.text,
      type: values.type.toUpperCase(),
      price: Number(values.price),
      size: Number(values.field),   
      totalRooms: Number(values.room),
      restrooms: Number(values.restroom),
      garage: Boolean(values.parking),
      windowsCount: Number(values.windows),
      windowType: values.window,
      roofMaterial: values.ground,
      door: values.door,
      completionDate: String(values.year),
      floorNumber: Number(values.floor),
      totalFloors: Number(values.aptfloor),
      balcony: Boolean(values.balcony),
      lift: true,
      images: values.images,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI ?? "http://localhost:4200/api/graphql"}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL алдаа:', result.errors);
      alert('Алдаа гарлаа: ' + result.errors[0].message);
      return;
    }

    console.log('Амжилттай хадгалагдлаа:', result.data.createPost);
    alert('Амжилттай илгээгдлээ!');
    formikHelpers.resetForm();
  } catch (error) {
    console.error('Сүлжээний алдаа:', error);
    alert('Сүлжээний алдаа гарлаа!' + error );
  }
},
  });
};
