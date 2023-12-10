import React from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UserIcon } from '../../assets/icons/headerbar/user.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/headerbar/close.svg';
import Modal from '../UI/Modal';
import { auth } from '../../firebase';

function UserMenu({ onClose }) {
  const navigate = useNavigate('');

  const isMobile = useSelector((state) => state.deviceWidth.isMobile);
  const username = useSelector((state) => state.user.username);
  const userEmail = useSelector((state) => state.user.email);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };

  const menu = (
    <Modal onClose={onClose}>
      <div className="my-4">
        <div className="mb-3 flex flex-col items-center">
          <UserIcon className="w-12 h-12 text-gray-600" />
          <h2 className="mt-2 font-medium text-lg">{username}</h2>
          <p className="text-gray-600 text-sm">{userEmail}</p>
        </div>
        <div className="flex flex-col font-medium text-[14px] [&>div>*]:border-t-2 [&>div>*]:py-2 [&>div:hover]:bg-gray-100 [&>div>*]:mx-6 ">
          <div className="">
            <p>Dark mode</p>
          </div>
          <div className="">
            <button
              onClick={signOutHandler}
              type="button"
              className="w-[252px] text-start text-red-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );

  const mobileMenu = (
    <div className="px-6 text-lg font-medium  bg-white absolute z-10 w-screen h-screen">
      <div className="border-b-2 py-4 flex items-center justify-end">
        <button onClick={onClose} type="button">
          <CloseIcon className="w-6" />
        </button>
      </div>
      <div className="py-4 px-1 rounded-md hover:bg-gray-100">
        <button
          onClick={signOutHandler}
          className="text-start w-full"
          type="button"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return isMobile ? mobileMenu : menu;
}

export default UserMenu;
