import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as BitcoinLogo } from '../../assets/icons/others/bitcoin.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/others/right_arrow.svg';
import placeholderImage from '../../assets/images/placeholder-landing.png';

function Main() {
  return (
    <main className="flex max-w-5xl mx-auto mt-6">
      <section className="p-12 lg:flex">
        <div className="lg:max-w-md font-medium [&>*]:mb-6">
          <div className=" text-my-blue ">
            <Link
              to="signup"
              className="flex items-center mx-2 hover:underline text-sm font-semibold"
            >
              <BitcoinLogo className="w-7 mr-2" />
              Jump start your portfolio
              <RightArrow className="ml-2" />
            </Link>
          </div>
          <h1 className="lg:w-3/4 lg:text-6xl text-4xl ">
            <span>Jump start your crypto portfolio</span>
          </h1>
          <div className="lg:w-5/6">
            <span>
              Get started with buying and selling cryptocurrency easily by
              signing up for BaseCoin today.
            </span>
          </div>
          <div>
            <form className="w-full flex-col md:flex-row h-32 md:h-16 flex ">
              <input
                placeholder="Email adress"
                className="flex-1 lg:w-3/5  md:mr-2 border-grey-border border-solid border-2 rounded-md px-4 "
              />
              <Link
                to="signup"
                className="h-1/2 mt-1 py-4  md:mt-0 md:h-full px-9 text-white custom-bg-btn rounded-md border-transparent border-solid border-2"
              >
                Get started
              </Link>
            </form>
          </div>
        </div>
        <div className="lg:pt-9 lg:pl-6">
          <img
            className="w-full object-contain"
            src={placeholderImage}
            alt="placeholder"
          />
        </div>
      </section>
    </main>
  );
}

export default Main;
