import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { useTelegram } from '../hooks/useTelegram';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { user, isTelegram, onHaptic } = useTelegram();
  const [toast, setToast] = useState<{message: string, type: 'success'|'info'} | null>(null);

  const handleCopyInvite = () => {
      onHaptic('medium');
      // Use real Telegram referral link format
      const link = `https://t.me/techportalops_bot?start=ref_${user?.id || 'guest'}`;
      navigator.clipboard.writeText(link);
      setToast({ message: 'Ссылка скопирована!', type: 'success' });
  };

  // Mock data if not in Telegram
  const displayUser = isTelegram && user ? {
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      handle: user.username ? `@${user.username}` : `ID: ${user.id}`,
      photo: user.photo_url
  } : {
      name: 'Гость',
      handle: '@guest_user',
      photo: null
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-y-auto transition-colors duration-200">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <header className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between z-10 border-b border-transparent dark:border-white/5 transition-colors duration-200">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Профиль</h2>
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 active:scale-95 transition-all"
        >
            <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={20} />
        </button>
      </header>

      <div className="px-4 pt-4 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-surface-border shadow-md">
                    {displayUser.photo ? (
                        <img src={displayUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-400">
                             <Icon name="person" size={32} />
                         </div>
                    )}
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{displayUser.name}</h3>
                <p className="text-sm text-gray-500">{displayUser.handle}</p>
                {isTelegram && user?.is_premium && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded mt-1">
                        <Icon name="star" size={12} filled /> Premium
                    </span>
                )}
            </div>
        </div>

        {/* Status Card */}
        <div className="bg-surface-dark rounded-2xl p-5 border border-white/5 relative overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
             <div className="relative z-10">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ваш статус</p>
                         <h3 className="text-xl font-bold text-white">Пробный период</h3>
                     </div>
                     <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/20">Active</span>
                 </div>
                 <div className="flex justify-between text-sm text-gray-300 mb-1">
                     <span>Осталось 2 дня</span>
                     <span className="text-gray-500">из 3</span>
                 </div>
                 <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                     <div className="h-full w-[66%] bg-gradient-to-r from-primary to-blue-400"></div>
                 </div>
                 <button 
                    onClick={() => { onHaptic('light'); navigate('/subscription'); }}
                    className="text-xs text-primary font-bold mt-3 hover:underline"
                 >
                    Продлить подписку →
                 </button>
             </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-3">
             <h3 className="font-bold text-lg text-gray-900 dark:text-white">Тема оформления</h3>
             <div className="grid grid-cols-2 gap-3">
                 <button 
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
                        theme === 'light' 
                            ? 'bg-white border-primary shadow-lg shadow-primary/10' 
                            : 'bg-white/50 border-gray-200 dark:bg-surface-dark dark:border-gray-700 text-gray-500'
                    }`}
                 >
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                         <Icon name="light_mode" size={20} />
                     </div>
                     <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}>Светлая</span>
                     {theme === 'light' && <Icon name="check_circle" className="ml-auto text-primary" size={18} />}
                 </button>

                 <button 
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
                        theme === 'dark' 
                            ? 'bg-surface-dark border-primary shadow-lg shadow-black/20' 
                            : 'bg-white/50 border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-gray-500'
                    }`}
                 >
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-primary/20 text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                         <Icon name="dark_mode" size={20} />
                     </div>
                     <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>Темная</span>
                     {theme === 'dark' && <Icon name="check_circle" className="ml-auto text-primary" size={18} />}
                 </button>
             </div>
        </div>

        {/* Invite Friend Banner */}
        <div 
            onClick={handleCopyInvite}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform shadow-lg"
        >
             <div className="absolute right-[-10px] bottom-[-10px] opacity-20 transform rotate-12">
                 <Icon name="handshake" size={80} />
             </div>
             <h3 className="font-bold text-lg mb-1">Пригласи друга</h3>
             <p className="text-sm opacity-90 mb-3 max-w-[70%]">Получи 1 месяц бесплатно за каждого друга!</p>
             <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-bold py-2 px-4 rounded-lg shadow-sm border border-white/10 flex items-center gap-2">
                 <Icon name="content_copy" size={16} />
                 <span>Скопировать ссылку</span>
             </button>
        </div>

        {/* Admin Toggle (Enhanced) */}
        <div className="pt-2">
            <button 
                onClick={() => { onHaptic('heavy'); navigate('/admin'); }}
                className="w-full py-4 rounded-xl flex items-center justify-between px-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-200 dark:bg-white/10 rounded-lg text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                        <Icon name="admin_panel_settings" size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Панель администратора</div>
                        <div className="text-[10px] text-gray-500">Управление базой знаний</div>
                    </div>
                </div>
                <Icon name="chevron_right" className="text-gray-400" />
            </button>
        </div>
        
        <div className="text-center pb-4">
            <p className="text-[10px] text-gray-300 dark:text-gray-600 font-mono">
                v1.0.3 build 240 • Telegram WebApp SDK
            </p>
        </div>
      </div>
    </div>
  );
};