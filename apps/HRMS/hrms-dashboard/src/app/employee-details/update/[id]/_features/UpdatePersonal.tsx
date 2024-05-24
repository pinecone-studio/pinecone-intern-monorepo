import * as Yup from 'yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CloseSvg } from '../../../../../../public/assets/CloseSvg';
import { UpdatePersonalInformationInput, usePersonalUpdateMutation } from '@/generated';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fileManagement } from '@/file-management';

type PersonalUpdateModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  firstName?: string | null;
  lastName?: string | null | undefined;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  homeAddress?: string | null;
  imageUrl?: string | null;
  refetch: () => void;
};

const validationSchema = Yup.object().shape({
  lastName: Yup.string().required('Last Name is required'),
  firstName: Yup.string().required('First Name is required'),
  jobTitle: Yup.string().required('Job Title is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string(),
  homeAddress: Yup.string(),
});

export const UpdatePersonal = (props: PersonalUpdateModalProps) => {
  const [value, setValue] = useState(props.imageUrl);
  const { id } = useParams();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files);

      const accessUrl = await fileManagement(file, 'HRMS-dashboard');

      setValue(accessUrl[0]);
    }
  };

  const initialValues = {
    imageUrl: props.imageUrl,
    lastName: props.lastName,
    firstName: props.firstName,
    jobTitle: props.jobTitle,
    email: props.email,
    phone: props.phone,
    homeAddress: props.homeAddress,
  };
  const [personalUpdate] = usePersonalUpdateMutation();

  const handleSubmit = async (values: UpdatePersonalInformationInput) => {
    await personalUpdate({
      variables: {
        personalUpdateId: id,
        input: {
          firstName: values.firstName,
          imageUrl: value,
          jobTitle: values.jobTitle,
          email: values.email,
          phone: values.phone,
          lastName: values.lastName,
          homeAddress: values.homeAddress,
        },
      },
    });
    props.refetch();
    props.setIsModalOpen(false);
  };

  return (
    <div data-testid="personal-info-modal" className="fixed inset-0 flex items-center justify-center bg-[#0000004D] bg-opacity-50 z-50">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, isValid }) => (
          <Form data-testid="update-form" className="flex flex-col gap-2 rounded-[8px] p-10 bg-white ">
            <div className="flex justify-between ">
              <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
              <button
                data-testid="modal-close-icon"
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
                disabled={isSubmitting}
              >
                <CloseSvg />
              </button>
            </div>
            <div data-testid="profile-picture" className="w-1/3  aspect-square rounded-full overflow-hidden m-auto relative my-4 ">
              <Image fill style={{ objectFit: 'cover' }} src={value || '/avatar.png'} alt="profile picture" />
            </div>
            <input type="file" onChange={(e) => handleUpload(e)} className=" bg-black" />
            <div>
              <p className=" font-normal ">Овог</p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="lastName" placeholder="Last Name" />
              <ErrorMessage data-testid="lastName-error" name="lastName" component="div" className=" text-[red] error" />
            </div>
            <div>
              <p className=" font-normal ">Нэр</p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="firstName" placeholder="First Name" />
              <ErrorMessage data-testid="firstName-error" name="firstName" component="div" className=" text-[red] error" />
            </div>
            <div>
              <p className=" font-normal ">Ажлын байр</p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="jobTitle" placeholder="Job Title" />
              <ErrorMessage data-testid="jobTitle-error" name="jobTitle" component="div" className=" text-[red] error" />
            </div>
            <div>
              <p className=" font-normal ">Имэйл</p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="email" name="email" placeholder="Email" />
              <ErrorMessage data-testid="email-error" name="email" component="div" className=" text-[red] error" />
            </div>
            <div>
              <p className=" font-normal ">Утасны дугаар</p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="phone" placeholder="Phone" />
              <ErrorMessage data-testid="phone-error" name="phone" component="div" className=" text-[red] error" />
            </div>
            <div>
              <p className=" font-normal ">Хаяг</p>
              <Field data-testid="home-address" className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="homeAddress" placeholder="Address" />
              <ErrorMessage data-testid="address-error" name="homeAddress" component="div" className=" text-[red] error" />
            </div>

            <div className="flex max-w-[408px] justify-end gap-2 ">
              <button
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
                data-testid="personal-info-cancel"
                className="w-[100px] rounded-[8px] h-[48px] border-[1px] bg-white border-[#D6D8DB] "
                type="button"
                disabled={isSubmitting}
              >
                Цуцлах
              </button>
              <button data-testid="submit-btn" className="w-[100px] rounded-[8px] h-[48px] bg-black text-[white] " type="submit" disabled={isSubmitting && !isValid}>
                Хадгалах
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
