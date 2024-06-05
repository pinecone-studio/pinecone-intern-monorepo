'use client';
import Link from 'next/link';
import { ProfileMain } from './_features';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
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
                  <input type="text" placeholder="HU123456@nest.edu.mn" className="input input-bordered w-full " />
                </div>
                <div className="mt-[24px]">
                  {' '}
                  <p className="mb-2">Сурагчийн нэр</p>
                  <input type="text" placeholder="П.Жавхлантөгс" className="input input-bordered w-full " />
                </div>
                <div className="mt-[24px]">
                  <p className="mb-2">И-мэйл</p>
                  <input type="text" placeholder="@jawhaajoshua@gmail.com" className="input input-bordered w-full " />
                </div>
                <div className="mt-[24px]">
                  {' '}
                  <p className="mb-2">Нууц үг</p>
                  <input type="password" placeholder="********" className="input input-bordered w-full  mb-4" />
                </div>
                <button className="btn btn-active btn-neutral absolute right-6 bottom-8  ">Хадгалах</button>
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
