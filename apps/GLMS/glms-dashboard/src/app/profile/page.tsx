'use client';
import Link from 'next/link';
import { ProfileMain } from './_features';
import jwt from 'jsonwebtoken';
import { User } from '@/generated';
import React, { useState } from 'react';
import { any } from 'cypress/types/bluebird';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const user = jwt.decode(localStorage.getItem('token') as string) as User;
  console.log('user', user);
  const [values, setValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  const [errors, setErrors] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors: any = {};
    const { input1, input2, input3, input4 } = values;
    tempErrors.input1 = input1 ? '' : 'Сурагчийн код оруулна уу?';
    tempErrors.input2 = input2 ? '' : 'Сурагчийн нэр оруулна уу?';
    tempErrors.input3 = input3 ? '' : 'И-мэйл оруулна уу?';
    tempErrors.input4 = input4 ? '' : 'Нууц үг оруулна уу? ';

    const allValues = [input1, input2, input3, input4];
    const uniqueValues = new Set(allValues);

    if (uniqueValues.size !== allValues.length) {
      tempErrors.general = 'Давхардсан байна?';
    }

    setErrors(tempErrors);

    return Object.values(tempErrors).every((error) => error === '');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission if all values are valid
      alert('Form submitted successfully!');
    }
  };
  return (
    <div className="bg-[#f8f8f9]">
      <div className=" h-[1000px] flex gap-6 p-8 " data-testid="profile-main">
        {/* <h1>hello from GLMS dashboard Profile Page</h1> */}
        <div className="w-[361px] h-[592px] bg-white"></div>
        <div className="bg-white w-[856px] h-[592px]">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn btn-active btn-neutral" onClick={() => document.getElementById('my_modal_3').showModal()}>
            Засах
          </button>
          <dialog id="my_modal_3" className="modal ">
            <div className="modal-box w-[556px] h-[608px] ">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <main className="">
                <h3 className="font-bold text-lg py-4 justify-center flex">Мэдээлэл засах</h3>
                <div className="mt-[24px]">
                  {' '}
                  <p className=" mb-2">Сурагчийн код</p>
                  <input type="text" name="input1" value={values.input1} onChange={handleChange} placeholder="HU123456@nest.edu.mn" className="input input-bordered w-full " />
                  <span>{errors.input1}</span>{' '}
                </div>
                <div className="mt-[24px]">
                  {' '}
                  <p className="mb-2">Сурагчийн нэр</p>
                  <input type="text" name="input2" value={values.input2} onChange={handleChange} placeholder="П.Жавхлантөгс" className="input input-bordered w-full " />
                  <span>{errors.input2}</span>
                </div>
                <div className="mt-[24px]">
                  <p className="mb-2">И-мэйл</p>
                  <input type="text" name="input3" value={values.input3} onChange={handleChange} placeholder="@jawhaajoshua@gmail.com" className="input input-bordered w-full " />
                  <span>{errors.input3}</span>
                </div>
                <div className="mt-[24px]">
                  {' '}
                  <p className="mb-2">Нууц үг</p>
                  <input type="password" name="input4" value={values.input4} onChange={handleChange} placeholder="********" className="input input-bordered w-full  mb-4" />
                  <span>{errors.input4}</span>{' '}
                </div>
                {errors && <div style={{ color: 'red' }}>{errors.general}</div>}
                <button className="btn btn-active btn-neutral absolute right-6 bottom-8  " onClick={handleSubmit}>
                  Хадгалах
                </button>
              </main>
            </div>
          </dialog>
        </div>{' '}
      </div>

      <ProfileMain data-testid="profile-main" />
      <Link href="/">
        <button data-testid="profile-btn" className="">
          Go back to home page
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
