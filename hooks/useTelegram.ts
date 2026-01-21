import { useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '../types';

const tg = window.Telegram?.WebApp;

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand(); // Always expand to full height
      setIsReady(true);
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
      
      // Ensure header color matches app theme
      try {
          const isDark = document.documentElement.classList.contains('dark');
          tg.setHeaderColor(isDark ? '#101922' : '#ffffff');
      } catch (e) {
          console.warn('Telegram setHeaderColor not supported or failed');
      }
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  const onHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
    tg?.HapticFeedback.impactOccurred(style);
  };
  
  const onNotification = (type: 'success' | 'error' | 'warning') => {
      tg?.HapticFeedback.notificationOccurred(type);
  }

  return {
    onClose,
    onHaptic,
    onNotification,
    tg,
    user,
    isReady,
    isTelegram: !!tg?.initData
  };
}