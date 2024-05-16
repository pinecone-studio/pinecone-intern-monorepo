import * as Yup from 'yup';
import { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CloseIcon } from '../../../../asset/icons/CloseIcon';

type PersonalUpdateModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  homeAddress?: string | null;
  imageUrl?: string | null;
};

export const PersonalUpdateModal = (props: PersonalUpdateModalProps) => {
  const initialValues = {
    imageUrl: props.imageUrl,
    lastName: props.lastName,
    firstName: props.firstName,
    jobTitle: props.jobTitle,
    email: props.email,
    phone: props.phone,
    address: props.homeAddress,
  };

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required('ImageUrl is required'),
    lastName: Yup.string().required('Last Name is required'),
    firstName: Yup.string().required('First Name is required'),
    jobTitle: Yup.string().required('Job Title is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = () => {};

  return (
    <div data-testid="personal-info-modal" className="fixed inset-0 flex items-center justify-center bg-[#0000004D] bg-opacity-50 z-50">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-col gap-2 rounded-[8px] p-10 bg-white  ">
            <div className="flex justify-between ">
              <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
              <button
                data-testid="modal-close-icon"
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
                disabled={isSubmitting}
              >
                <CloseIcon />
              </button>
            </div>
            <div>
              <p className=" font-normal ">imageUrl </p>
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="imageUrl" placeholder="Image URL" />
              <ErrorMessage data-testid="imageUrl-error" name="imageUrl" component="div" className=" text-[red] error" />
            </div>
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
              <p className=" font-normal ">Ажилын байр</p>
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
              <Field className="w-[408px] p-2 h-[50px] border-[1px] rounded-[8px] border-[#D6D8DB] bg-[#F7F7F8] " type="text" name="address" placeholder="Address" />
              <ErrorMessage data-testid="address-error" name="address" component="div" className=" text-[red] error" />
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
              <button onClick={handleSubmit} data-testid="submit-btn" className="w-[100px] rounded-[8px] h-[48px] bg-black text-[white] " type="submit" disabled={isSubmitting && !isValid}>
                Хадгалах
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
