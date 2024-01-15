import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, MoonStars } from '@phosphor-icons/react';
import * as Switch from '@radix-ui/react-switch';

const DarkModeToggle = () => {
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
    <Switch.Root
      className={`w-14 h-8 rounded-full border bg-zinc-200 relative data-[state=checked]:bg-indigo-500 flex justify-start items-center data-[state=checked]:justify-end`}
      checked={theme === 'dark'}
      onCheckedChange={handleSwitchTheme}>
      <Switch.Thumb className="absolute h-7 w-7 ml-0.5 mr-0.5 rounded-full bg-white border shadow-sm flex justify-center items-center data-[state=checked]:border-zinc-700 data-[state=checked]:bg-zinc-800">
        {theme === 'dark' ? (
          <MoonStars size={20} className="text-zinc-200" />
        ) : (
          <Sun size={20} className="text-zinc-500" />
        )}
      </Switch.Thumb>
    </Switch.Root>
  );
};

export default DarkModeToggle;
