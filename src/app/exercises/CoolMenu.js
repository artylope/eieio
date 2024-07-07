import React from 'react';
import Link from 'next/link';
import {
  Home,
  BriefcaseBusiness,
  FileText,
  SquareUserRound,
  Sun,
  Moon,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

const MenuButton = ({ label, icon: Icon }) => (
  <Tooltip.Provider delayDuration={0}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="flex flex-col gap-y-1.5 justify-center items-center w-16">
          <div className="w-12 h-12 rounded-full border border-zinc-100 bg-white flex justify-center items-center hover:bg-zinc-50 hover:shadow-inner transition-all">
            <Icon className="w-5 h-5 text-zinc-600" />
          </div>
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content
        side="top"
        align="center"
        sideOffset={5}
        className="tooltip-content">
        <Tooltip.Arrow className="tooltip-arrow" />
        <div className="bg-zinc-900 text-white px-4 py-2 rounded-full shadow-md">
          <p className="text-sm uppercase font-semibold">{label}</p>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const CoolMenu = () => {
  return (
    <div className="relative w-full h-48 flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="p-4 rounded-full border border-zinc-100 bg-white flex justify-center items-center shadow-2xl">
          <nav className="flex justify-center items-center">
            <MenuButton label="Home" icon={Home} link="/" />
            <MenuButton label="Works" icon={BriefcaseBusiness} link="/works" />
            <MenuButton label="Blog" icon={FileText} link="/blog" />
            <MenuButton label="About" icon={SquareUserRound} link="/about" />
            <div className="h-8 w-[1px] bg-zinc-200 mx-4"></div>
            <MenuButton label="Mode" icon={Sun} link="#" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CoolMenu;
