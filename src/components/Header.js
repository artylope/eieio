'use client';
import React from 'react';
import Image from 'next/image';
import Logo from '@/image/eieio.svg';
// import DarkModeToggle from '@/components/DarkModeToggle';

const Header = () => {
  return (
    <header className="bg-zinc-50 border-b">
      <div className="container mx-auto py-16 flex flex-col gap-y-4 ">
        <div className="flex flex-col md:flex-row justify-between items-start grow gap-x-3">
          <div className="flex flex-col md:flex-row  justify-start items-start gap-x-6">
            <Image
              src={Logo}
              className="w-48"
              alt="EIEIO - Logo of Engaging and Intuitive Encyclopedia of Interactive Organisms"
            />
            <div className="flex flex-col gap-y-2">
              <div className="font-semibold text-4xl max-w-2xl text-zinc-900">
                Engaging and Intuitive Encyclopedia of Interactive Organisms
              </div>
              <div className="mt-1 md:mt-0">by Artylope</div>
            </div>
          </div>

          {/* <div className="flex gap-x-2 justify-between items-center mt-2 md:mt-0">
            <DarkModeToggle />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
