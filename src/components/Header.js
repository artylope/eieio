'use client';
import React from 'react';
import Image from 'next/image';
import Logo from '@/image/eieio.svg';
import { useTheme } from 'next-themes';

import { Sun, MoonStars } from '@phosphor-icons/react';

import * as Switch from '@radix-ui/react-switch';

const Header = () => {
  const { theme, setTheme } = useTheme('');

  let ThumbIcon;

  function handleSwitchTheme() {
    console.log(theme);
    if (theme === 'light') {
      setTheme('dark');
      ThumbIcon = <Sun size={20} />;
    } else if (theme === 'dark') {
      setTheme('light');
      ThumbIcon = <MoonStars size={20} />;
    } else {
      setTheme('dark');
      ThumbIcon = <Sun size={20} />;
    }
  }

  return (
    <header className="bg-slate-50 border-b">
      <div className="container mx-auto py-16 flex gap-y-4 ">
        <div className="flex flex-col md:flex-row justify-between items-start grow gap-x-2">
          <div className="flex flex-col md:flex-row  justify-start items-start gap-x-6">
            <Image src={Logo} className="w-48" />
            <div className="flex flex-col gap-y-2">
              <div className="font-bold text-4xl max-w-2xl text-slate-900">
                Engaging and Intuitive Encyclopedia of Interactive Organisms
              </div>
              <div className="mt-1 md:mt-0">by Artylope</div>
            </div>
          </div>

          <div className="flex gap-x-2 justify-between items-center mt-2 md:mt-0">
            <Switch.Root
              className={`w-14 h-8 rounded-full border bg-slate-200 relative data-[state=checked]:bg-indigo-500 flex justify-start items-center data-[state=checked]:justify-end`}
              checked={theme === 'dark'}
              onCheckedChange={handleSwitchTheme}>
              <Switch.Thumb className="absolute h-7 w-7 ml-0.5 mr-0.5 rounded-full bg-white border shadow-sm flex justify-center items-center data-[state=checked]:border-slate-700 data-[state=checked]:bg-slate-800">
                {theme === 'dark' ? (
                  <MoonStars size={20} className="text-slate-200" />
                ) : (
                  <Sun size={20} className="text-slate-500" />
                )}
              </Switch.Thumb>
            </Switch.Root>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
