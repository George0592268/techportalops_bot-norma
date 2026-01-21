import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-[slideDown_0.3s_ease-out] w-max max-w-[90%]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border ${
        type === 'success' 
          ? 'bg-gray-900/90 text-white border-green-500/30' 
          : 'bg-gray-900/90 text-white border-primary/30'
      }`}>
        <div className={`rounded-full p-1 ${type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
             <Icon name={type === 'success' ? 'check' : 'info'} size={18} />
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};