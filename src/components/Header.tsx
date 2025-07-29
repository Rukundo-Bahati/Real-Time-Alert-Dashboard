// src/components/Header.tsx
import React from 'react';
import { Wifi, WifiOff, Sun, Moon, Activity } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface HeaderProps {
  isConnected: boolean;
  onGenerateDemoAlert: () => void;
}

const Header: React.FC<HeaderProps> = ({ isConnected, onGenerateDemoAlert }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          Live Alert Dashboard
        </h1>
        <p className="text-muted-foreground">Real-time security monitoring system</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
          <Moon className="h-4 w-4" />
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-alert-success connection-pulse" />
          ) : (
            <WifiOff className="h-5 w-5 text-alert-critical" />
          )}
          <span className={`text-sm font-medium ${isConnected ? 'text-alert-success' : 'text-alert-critical'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <Button onClick={onGenerateDemoAlert} variant="outline" size="sm">
          Generate Demo Alert
        </Button>
      </div>
    </div>
  );
};

export default Header;