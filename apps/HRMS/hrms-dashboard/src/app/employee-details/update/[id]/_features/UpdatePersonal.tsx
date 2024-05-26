import * as Yup from 'yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CloseSvg } from '../../../../../../public/assets/CloseSvg';
import { UpdatePersonalInformationInput, usePersonalUpdateMutation } from '@/generated';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fileManagement } from '@/file-management';
import { toast } from 'react-toastify';
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
  lastName: Yup.string().required('Овог оруулна уу'),
  firstName: Yup.string().required('Нэр оруулна уу'),
  jobTitle: Yup.string().required('Ажлын байр оруулна уу'),
  email: Yup.string().email('Хүчинтэй и-мэйл оруулна уу').required('Имэйл оруулна уу'),
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
    const { data } = await personalUpdate({
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
    if (data?.personalUpdate.id) {
      toast.success(`Мэдээлэл шинэчлэгдлээ`, {
        position: 'top-center',
        hideProgressBar: true,
      });
    }
    props.refetch();
    props.setIsModalOpen(false);
  };
  return (
    <div data-testid="personal-info-modal" className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div
        onClick={() => {
          props.setIsModalOpen(false);
        }}
        className="bg-[#00000080] w-screen h-screen absolute z-[-1]"
      ></div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, isValid }) => (
          <Form data-testid="update-form" className="flex flex-col gap-4 rounded-[8px] p-10 bg-white ">
            <div className="flex justify-between ">
              <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
              <button
                data-testid="modal-close-icon"
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
                disabled={isSubmitting}
              > <CloseSvg /></button>
            </div>
            <div className="relative w-1/3 m-auto">
              <figure data-testid="profile-picture" className="w-full  aspect-square rounded-full overflow-hidden m-auto relative my-4 ">
                <Image fill style={{ objectFit: 'cover' }} src={value || '/avatar.png'} alt="profile picture" />
              </figure>
              <div style={{ backgroundImage: 'url(/plus.png)', backgroundSize: 'cover', cursor:'pointer'}} className="w-8 h-8 absolute z-10 bottom-1 right-0 rounded-full overflow-hidden cursor-pointer">
                <input style={{ opacity: 0 }} type="file" id="file-test" onChange={(e) => handleUpload(e)}  />
              </div>
            </div>
            <div className="flex gap-4">
              <section className="flex flex-col gap-4 max-w-[200px]">
                <div>
                  <p className=" font-normal ">Овог</p>
                  <Field className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="lastName" placeholder="Last Name" />
                  <ErrorMessage data-testid="lastName-error" name="lastName" component="div" className=" text-[red] error" />
                </div>
                <div>
                  <p className=" font-normal ">Нэр</p>
                  <Field className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="firstName" placeholder="First Name" />
                  <ErrorMessage data-testid="firstName-error" name="firstName" component="div" className=" text-[red] error" />
                </div>
                <div>
                  <p className=" font-normal ">Ажлын байр</p>
                  <Field className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="jobTitle" placeholder="Job Title" />
                  <ErrorMessage data-testid="jobTitle-error" name="jobTitle" component="div" className=" text-[red] error" />
                </div>
              </section>
              <section className="flex flex-col gap-4 max-w-[200px]">
                <div>
                  <p className=" font-normal ">Имэйл</p>
                  <Field className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="email" name="email" placeholder="Email" />
                  <ErrorMessage data-testid="email-error" name="email" component="div" className=" text-[red] error" />
                </div>
                <div>
                  <p className=" font-normal ">Утасны дугаар</p>
                  <Field className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="phone" placeholder="Утасны дугаар" />
                  <ErrorMessage data-testid="phone-error" name="phone" component="div" className=" text-[red] error" />
                </div>
                <div>
                  <p className=" font-normal ">Хаяг</p>
                  <Field
                    data-testid="home-address"
                    className="w-full p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] "
                    type="text"
                    name="homeAddress"
                    placeholder="Гэрийн хаяг"
                  />
                  <ErrorMessage data-testid="address-error" name="homeAddress" component="div" className=" text-[red] error" />
                </div>
              </section>
            </div>
            <div className="flex max-w-[408px] justify-end gap-2 mt-2">
              <button
                onClick={() => {props.setIsModalOpen(false);}}
                data-testid="personal-info-cancel"
                className="w-[100px] rounded-[8px] h-[48px] border-[1px] bg-white border-[#D6D8DB] "
                type="button"
                disabled={isSubmitting}
              > Цуцлах
              </button>
              <button data-testid="submit-btn" className="w-[100px] rounded-[8px] h-[48px] bg-black text-[white] " type="submit" disabled={isSubmitting && !isValid}>
                Хадгалах
              </button>
            </div>
          </Form>)}
      </Formik>
    </div>);
};
