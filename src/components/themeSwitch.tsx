'use client';

import { useTheme } from 'next-themes';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2 ">
      <Switch id="airplane-mode" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <Label htmlFor="airplane-mode">{theme} mode</Label>
    </div>
  );
};

export default ThemeSwitch;
