import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

export const SubscriptionScreen: React.FC = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const navigate = useNavigate();

  const handlePayment = () => {
      setPaymentStatus('processing');
      // Simulate API call to Yoomoney
      setTimeout(() => {
          setPaymentStatus('success');
          // Auto close after success
          setTimeout(() => {
              navigate('/profile');
          }, 2000);
      }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto pb-24 relative">
      <div className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between">
        <h2 className="text-lg font-bold">TechPortal OPS</h2>
        <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">PRO</div>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-6">
        {/* Hero Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-dark border border-white/5 group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,#137fec_0%,transparent_60%)] z-0"></div>
            
            <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white mb-4 animate-pulse">
                    🔥 ХИТ СЕЗОНА
                </span>
                <h3 className="text-3xl font-bold text-white mb-2">Pro Access</h3>
                
                <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-extrabold text-white">299 ₽</span>
                    <span className="text-lg text-gray-500 line-through decoration-2">1000 ₽</span>
                </div>
                <div className="mt-1 text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">
                    -70% скидка
                </div>

                <div className="h-px w-full bg-white/10 my-6"></div>

                <div className="flex items-center gap-2 text-green-400">
                    <Icon name="verified" filled className="text-xl" />
                    <span className="text-sm font-bold">3 дня бесплатно — платите потом</span>
                </div>
            </div>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold px-1">Преимущества подписки</h3>
            {[
                { icon: 'smart_toy', title: 'AI-консультант', desc: 'Безлимитные ответы и генерация документов' },
                { icon: 'library_books', title: 'Полная База', desc: 'Доступ к закрытым ГОСТ и СП' },
                { icon: 'bolt', title: 'Приоритет', desc: 'Ответ эксперта в течение 15 минут' }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon name="smart_toy" size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Payment Methods Visual */}
        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-primary/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Оплата через</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yoomoney flex items-center justify-center text-white font-bold text-xs">Ю</div>
                <div>
                    <p className="font-bold text-sm">Банковская карта / ЮMoney</p>
                    <p className="text-xs text-gray-500">Безопасная оплата SSL</p>
                </div>
            </div>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center gap-4 py-4 text-[10px] text-gray-400">
             <a href="#" className="hover:underline">Политика конфиденциальности</a>
             <span>•</span>
             <a href="#" className="hover:underline">Оферта</a>
             <span>•</span>
             <a href="#" className="hover:underline">Тарифы</a>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-4 right-4 z-40">
        <button 
            onClick={() => setShowPayment(true)}
            className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-primary/30"
        >
            <span>Попробовать бесплатно</span>
            <Icon name="arrow_forward" size={20} />
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-2">
            3 дня бесплатно, затем 299 ₽ в месяц. Отмена в любое время.
        </p>
      </div>

      {/* Mock Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background-light dark:bg-background-dark animate-[fadeIn_0.2s_ease-out]">
            {paymentStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-[scaleIn_0.3s_ease-out]">
                    <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white mb-6 shadow-2xl shadow-green-500/40">
                        <Icon name="check" size={48} className="animate-[bounce_1s_infinite]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Оплата прошла успешно!</h2>
                    <p className="text-gray-500">Подписка активирована. Спасибо, что вы с нами.</p>
                </div>
            ) : (
                <>
                <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <button onClick={() => setShowPayment(false)} className="p-2 -ml-2" disabled={paymentStatus === 'processing'}>
                        <Icon name="arrow_back_ios_new" />
                    </button>
                    <h2 className="text-base font-bold flex-1 text-center pr-8">Оплата заказа</h2>
                </header>
                <main className="flex-1 p-4 space-y-6">
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                                    <Icon name="stars" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Premium Подписка</h3>
                                    <p className="text-xs text-gray-500">TechPortalOps Bot</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs line-through text-gray-400">499 ₽</div>
                                <div className="text-xl font-bold text-primary">299 ₽</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase">Выберите способ</p>
                        <label className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border-2 border-primary cursor-pointer">
                            <input type="radio" name="pay" defaultChecked className="text-primary focus:ring-primary bg-transparent border-gray-500" />
                            <Icon name="credit_card" className="text-gray-400" />
                            <div className="flex-1">
                                <div className="font-bold text-sm">Банковская карта</div>
                                <div className="text-xs text-gray-500">Visa, Mastercard, MIR</div>
                            </div>
                        </label>
                        <label className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer opacity-70">
                            <input type="radio" name="pay" className="text-primary focus:ring-primary bg-transparent border-gray-500" />
                            <div className="w-6 h-6 rounded-full bg-yoomoney flex items-center justify-center text-white text-[10px] font-bold">Ю</div>
                            <div className="flex-1">
                                <div className="font-bold text-sm">Кошелек ЮMoney</div>
                            </div>
                        </label>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={paymentStatus === 'processing'}
                        className="w-full bg-yoomoney hover:bg-yoomoney/90 text-white font-bold h-12 rounded-xl mt-8 shadow-lg flex items-center justify-center gap-2"
                    >
                        {paymentStatus === 'processing' ? (
                            <>
                                <Icon name="sync" className="animate-spin" />
                                <span>Обработка...</span>
                            </>
                        ) : (
                            <span>Оплатить 299 ₽</span>
                        )}
                    </button>
                    <div className="flex justify-center items-center gap-2 text-gray-400 text-xs">
                        <Icon name="lock" size={14} />
                        <span>Безопасная оплата PCI DSS</span>
                    </div>
                </main>
                </>
            )}
        </div>
      )}
    </div>
  );
};