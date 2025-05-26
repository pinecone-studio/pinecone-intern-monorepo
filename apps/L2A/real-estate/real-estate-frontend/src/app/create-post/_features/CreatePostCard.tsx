import * as React from 'react';
import { CreatePostText } from '../_components/CreatePostText';
import { CreatePostLocation } from '../_components/CreatePostLocation';
import { CreatePostDistrict } from '../_components/CreatePostDistrict';
import { CreatePostSection } from '../_components/CreatePostSection';
import { CreatePostApartFloor } from '../_components/CreatePostApartFloor';
import { CreatePostGround } from '../_components/CreatePostGround';
import { CreatePostBalcony } from '../_components/CreatePostBalcony';
import { CreatePostImages } from '../_components/CreatePostImages';
import { useCreatePostFormik } from '../form-utils';
import { FormikErrors, FormikTouched } from 'formik';
import { CreatePostButton } from '../_components/_button/CreatePostButton';
import { CreatePostName } from '../_components/CreatePostName';
import { CreatePostType } from '../_components/CreatePostType';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostApartment } from '../_components/CreatePostApartment';
import { CreatePostYear } from '../_components/CreatePostYear';
import { CreatePostWindows } from '../_components/CreatePostWindows';
import { CreatePostWindow } from '../_components/CreatePostWindow';
import { CreatePostDoor } from '../_components/CreatePostDoor';
import { CreatePostFloor } from '../_components/CreatePostFloor';
import { CreatePostPrice } from '../_components/CreatePostPrice';
import { CreatePostField } from '../_components/CreatePostField';
import { CreatePostRoom } from '../_components/CreatePostRoom';
import { CreatePostRestroom } from '../_components/CreatePostRestroom';
import { CreatePostParking } from '../_components/CreatePostParking';
export const CreatePostCard = () => {  const formik = useCreatePostFormik();
  const getFieldError = (touched: FormikTouched<any>, errors: FormikErrors<any>, field: string): string | undefined => {
    const error = errors[field];
    return touched[field] && typeof error === 'string' ? error : undefined;
  };
  const handleSaveDraft = () => {
    const values = formik.values;
    localStorage.setItem('real-estate-draft', JSON.stringify(values));
    alert('Таны зар түр хадгалагдлаа');
  };
  return (  <form onSubmit={formik.handleSubmit} className="flex justify-center space-y-2 gap-2">
    <div className="w-full py-6 px-6 bg-[#F4F4F5] flex justify-center">
      <div className='max-w-[730px] px-6'>
        <div className="p-2 flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center">
          <div className="p-1 space-y-2 my-2">
          <CreatePostHeader />
              <CreatePostType name="type" value={formik.values.type} onChange={(value) => formik.setFieldValue('type', value)} error={getFieldError(formik.touched, formik.errors, 'type')} />
              <CreatePostName name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'name')} />
              <CreatePostPrice name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'price')} />
              <CreatePostField name="field" value={formik.values.field} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'field')} />
              <CreatePostRoom name="room" value={formik.values.room} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'room')} />
              <CreatePostRestroom
                name="restroom"
                value={formik.values.restroom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'restroom')}
              />
              <CreatePostParking
                name="parking"
                value={formik.values.parking}
                onChange={(value) => formik.setFieldValue('parking', value)}
                error={getFieldError(formik.touched, formik.errors, 'parking')}
              />
              <CreatePostText name="text" value={formik.values.text} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'text')} />
            </div>
          </div>
          <div className="p-4 flex flex-col mt-4 gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostImages data-testid="images" name="images" value={formik.values.images} onChange={(urls) => formik.setFieldValue('images', urls)} error={getFieldError(formik.touched, formik.errors, 'images')} />
            </div>
          </div>
          <div className="p-4 flex flex-col mt-4 gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostLocation />
              <CreatePostDistrict
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched,formik.errors,"district")}/>
              <CreatePostSection
                name="section"
                value={formik.values.section}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'section')}
              />
               </div>
          </div>
          <div className="p-4 flex flex-col mt-4 gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostApartment />
              <CreatePostYear name="year" value={formik.values.year} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'year')} />
              <CreatePostWindows
                name="windows"
                value={formik.values.windows}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'windows')}
              />
              <CreatePostWindow name="window" value={formik.values.window} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'window')} />
              <CreatePostDoor name="door" value={formik.values.door} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'door')} />
              <CreatePostFloor name="floor" value={formik.values.floor} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'floor')} />
              <CreatePostApartFloor
                name="aptfloor"
                value={formik.values.aptfloor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'aptfloor')}
              />
               <CreatePostGround name="ground" value={formik.values.ground} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'ground')} />
               <CreatePostBalcony
                name="balcony"
                value={formik.values.balcony}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'balcony')}
              />
               </div>
          </div>
        </div>
        <div className='max-w-[520px]'>
          <CreatePostButton
            images={formik.values.images}
            name={formik.values.name}
            price={formik.values.price}
            area={formik.values.field}
            rooms={formik.values.room}
            restrooms={formik.values.restroom}
            location={`${formik.values.district}, ${formik.values.section}`}
            onSaveDraft={handleSaveDraft}
            onSubmit={formik.handleSubmit}
          />
            </div>
      </div>
    </form>  );
};
