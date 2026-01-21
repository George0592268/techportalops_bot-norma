import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'chat', icon: 'chat', label: 'Чат', path: '/' },
    { id: 'docs', icon: 'menu_book', label: 'База', path: '/docs' },
    { id: 'sub', icon: 'stars', label: 'PRO', path: '/subscription', highlight: true },
    { id: 'profile', icon: 'person', label: 'Профиль', path: '/profile' },
  ];

  return (
    <nav className="shrink-0 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-pb z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Icon 
                name={tab.icon} 
                filled={isActive} 
                className={`text-[26px] ${tab.highlight && !isActive ? 'text-amber-500' : ''}`} 
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};