import React from 'react';
import { Container } from './assets';
import Link from 'next/link';
import { useAuth } from '../providers/Auth.Provider';
import { IoIosLogOut } from 'react-icons/io';

export const MainHeader = () => {
  const { user, signout } = useAuth();

  return (
    <Container backgroundColor="bg-backBlue text-white">
      <div className="flex justify-between items-center p-[10px]">
        <Link href="/">
          <PediaLogo />
        </Link>
        {user ? (
          <div className="flex gap-6 items-center">
            <Link href="/profile">
              <div>{user.email}</div>
            </Link>
            <IoIosLogOut onClick={signout} className="w-6 h-6 cursor-pointer" />
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <Link href="/signup">
                <button className="px-4 py-[10px]">Register</button>
              </Link>
              <Link href="/signin">
                <button className="px-4 py-[10px]">Log In</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
export const PediaLogo = () => {
  return (
    <svg width="87" height="20" viewBox="0 0 87 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#FAFAFA" />
      <path
        d="M34.26 1.775C35.7533 1.775 37.0133 2.28833 38.0166 3.29167C39.02 4.295 39.5333 5.53167 39.5333 7.025C39.5333 8.51833 39.02 9.755 38.0166 10.7583C37.0133 11.785 35.7533 12.275 34.26 12.275H30.5033V18.1083H28.3333V1.775H34.26ZM34.26 10.245C35.1466 10.245 35.8933 9.94167 36.5 9.335C37.0833 8.72833 37.3866 7.95833 37.3866 7.025C37.3866 6.09167 37.0833 5.32167 36.5 4.715C35.8933 4.10833 35.1466 3.805 34.26 3.805H30.5033V10.245H34.26Z"
        fill="white"
      />
      <path
        d="M42.421 13.2083C42.6077 14.2583 43.0977 15.075 43.8443 15.635C44.591 16.2183 45.5243 16.4983 46.6443 16.4983C48.1843 16.4983 49.3043 15.9383 50.0043 14.795L51.731 15.775C50.5877 17.5483 48.8843 18.4117 46.5977 18.4117C44.731 18.4117 43.2377 17.8517 42.071 16.685C40.9043 15.5183 40.3443 14.0483 40.3443 12.275C40.3443 10.525 40.9043 9.055 42.0477 7.88833C43.1677 6.72167 44.6377 6.13833 46.4577 6.13833C48.161 6.13833 49.561 6.745 50.6343 7.95833C51.7077 9.17167 52.2677 10.6183 52.2677 12.2983C52.2677 12.6017 52.2443 12.905 52.1977 13.2083H42.421ZM46.4577 8.05167C45.361 8.05167 44.451 8.37833 43.751 8.985C43.0277 9.59167 42.5843 10.4083 42.421 11.435H50.2143C50.0277 10.3383 49.6077 9.49833 48.9077 8.915C48.2077 8.355 47.391 8.05167 46.4577 8.05167Z"
        fill="white"
      />
      <path
        d="M64.2384 1.775H66.2684V18.1083H64.2384V16.1017C63.2117 17.6417 61.7417 18.4117 59.8284 18.4117C58.1951 18.4117 56.7951 17.8283 55.6517 16.6383C54.4851 15.4483 53.9251 14.0017 53.9251 12.275C53.9251 10.5717 54.4851 9.125 55.6517 7.935C56.7951 6.745 58.1951 6.13833 59.8284 6.13833C61.7417 6.13833 63.2117 6.90833 64.2384 8.44833V1.775ZM60.0851 16.4517C61.2517 16.4517 62.2551 16.055 63.0484 15.2617C63.8417 14.4683 64.2384 13.465 64.2384 12.275C64.2384 11.1083 63.8417 10.105 63.0484 9.31167C62.2551 8.51833 61.2517 8.09833 60.0851 8.09833C58.9184 8.09833 57.9384 8.51833 57.1451 9.31167C56.3517 10.105 55.9551 11.1083 55.9551 12.275C55.9551 13.465 56.3517 14.4683 57.1451 15.2617C57.9384 16.055 58.9184 16.4517 60.0851 16.4517Z"
        fill="white"
      />
      <path
        d="M70.3707 4.31833C69.974 4.31833 69.6474 4.20167 69.3907 3.92167C69.1107 3.665 68.994 3.33833 68.994 2.965C68.994 2.59167 69.1107 2.28833 69.3907 2.00833C69.6474 1.72833 69.974 1.58833 70.3707 1.58833C70.744 1.58833 71.0474 1.72833 71.3274 2.00833C71.584 2.28833 71.724 2.59167 71.724 2.965C71.724 3.33833 71.584 3.665 71.3274 3.92167C71.0474 4.20167 70.744 4.31833 70.3707 4.31833ZM69.344 18.1083V6.44167H71.374V18.1083H69.344Z"
        fill="white"
      />
      <path
        d="M84.131 6.44167H86.161V18.1083H84.131V16.1017C83.1043 17.6417 81.6343 18.4117 79.721 18.4117C78.0876 18.4117 76.6876 17.8283 75.5443 16.6383C74.3776 15.4483 73.8176 14.0017 73.8176 12.275C73.8176 10.5717 74.3776 9.125 75.5443 7.935C76.6876 6.745 78.0876 6.13833 79.721 6.13833C81.6343 6.13833 83.1043 6.90833 84.131 8.44833V6.44167ZM79.9776 16.4517C81.1443 16.4517 82.1476 16.055 82.941 15.2617C83.7343 14.4683 84.131 13.465 84.131 12.275C84.131 11.1083 83.7343 10.105 82.941 9.31167C82.1476 8.51833 81.1443 8.09833 79.9776 8.09833C78.811 8.09833 77.831 8.51833 77.0376 9.31167C76.2443 10.105 75.8476 11.1083 75.8476 12.275C75.8476 13.465 76.2443 14.4683 77.0376 15.2617C77.831 16.055 78.811 16.4517 79.9776 16.4517Z"
        fill="white"
      />
    </svg>
  );
};
