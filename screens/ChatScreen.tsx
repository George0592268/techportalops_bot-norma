import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { Message } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Привет! Я TechPortalOps бот. Спросите меня о нормах монтажа ОПС, расстояниях между датчиками или требованиях к кабельным линиям.',
    sender: 'ai',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

const QUICK_QUESTIONS = [
  "Расстояние между датчиками в коридоре",
  "Высота установки ручников",
  "Нормы прокладки кабеля",
  "Отступ от светильников"
];

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response with random delay
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponseText = 'Я ищу информацию в базе...';
      let attachments = undefined;

      // Simple mock logic for specific keywords
      if (text.toLowerCase().includes('коридор') || text.toLowerCase().includes('расстояние')) {
         aiResponseText = 'Согласно СП 484.1311500.2020, для коридоров шириной менее 2 метров расстояние между извещателями может быть увеличено до 15 метров, но не более чем в 1.5 раза от нормативного.';
         attachments = [{
            type: 'regulation' as const,
            data: {
              id: 'sp484',
              code: 'СП 484.1311500.2020',
              title: 'Системы пожарной сигнализации...',
              updatedAt: '2023',
              type: 'SP' as const,
              clause: 'Пункт 6.6.15',
              snippet: 'При ширине помещения до 2 м расстояние между извещателями может быть увеличено...'
            }
         }];
      } else if (text.toLowerCase().includes('ручн') || text.toLowerCase().includes('высот')) {
         aiResponseText = 'Ручные пожарные извещатели устанавливаются на высоте 1.5 м от уровня пола ± 0.1 м.';
         attachments = [{
            type: 'regulation' as const,
            data: {
              id: 'sp484_hand',
              code: 'СП 484.1311500.2020',
              title: 'Системы пожарной сигнализации...',
              updatedAt: '2023',
              type: 'SP' as const,
              clause: 'Пункт 6.6.28',
              snippet: 'Ручные пожарные извещатели следует устанавливать на стенах и конструкциях на высоте (1,5 ± 0,1) м.'
            }
         }];
      } else {
         aiResponseText = 'Я проанализировал ваш запрос через OpenRouter API (Mistral 7B). К сожалению, в текущем контексте векторной базы данных точного совпадения не найдено. Попробуйте уточнить запрос, например "монтаж извещателя на подвесной потолок".';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachments: attachments
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  const clearHistory = () => {
      setMessages(INITIAL_MESSAGES);
      setShowMenu(false);
      localStorage.removeItem('chat_history');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative" onClick={() => setShowMenu(false)}>
      {/* Header */}
      <header className="shrink-0 bg-white/95 dark:bg-[#101922]/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
            <div className="relative">
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Icon name="smart_toy" size={20} />
             </div>
             <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#101922] rounded-full"></span>
            </div>
            <div>
                <h1 className="text-sm font-bold leading-tight dark:text-white">ИИ Консультант ОПС</h1>
                <p className="text-[10px] text-primary font-medium">TechPortalOps Bot • Online</p>
            </div>
        </div>
        <div className="relative">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
                <Icon name="more_vert" />
            </button>
            {showMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-1 z-50 overflow-hidden animate-[scaleIn_0.1s_ease-out]">
                    <button onClick={clearHistory} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2">
                        <Icon name="delete_sweep" size={18} />
                        Очистить историю
                    </button>
                </div>
            )}
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex justify-center mb-4">
            <span className="text-xs font-medium text-gray-400 bg-gray-200 dark:bg-white/5 px-3 py-1 rounded-full">Сегодня</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message Bubble */}
              <div className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-tl-sm'
              }`}>
                <p>{msg.text}</p>

                {/* Attachments (Regulation Cards) */}
                {msg.attachments?.map((att, idx) => (
                  <div key={idx} className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111922]">
                    <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-gray-700">
                      <Icon name="menu_book" className="text-primary text-[20px]" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{att.data.code}</span>
                    </div>
                    <div className="p-3 relative">
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r"></div>
                      <div className="pl-3">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{att.data.clause}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                            {att.data.snippet}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-2 bg-gray-100/50 dark:bg-white/5 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 uppercase font-medium">Векторный поиск</span>
                        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                            <span>Открыть</span>
                            <Icon name="open_in_new" size={14} />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <span className="text-[10px] text-gray-400 mt-1 mx-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
            <div className="flex w-full justify-start">
                 <div className="flex flex-col items-start max-w-[85%]">
                     <div className="bg-white dark:bg-surface-dark px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-800 flex items-center gap-1">
                         <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                         <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                         <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                     </div>
                 </div>
            </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Quick Questions (Chips) */}
      <div className="shrink-0 overflow-x-auto no-scrollbar px-4 pb-2 bg-background-light dark:bg-background-dark">
          <div className="flex gap-2">
              {QUICK_QUESTIONS.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors active:scale-95"
                  >
                      {q}
                  </button>
              ))}
          </div>
      </div>

      {/* Input Area */}
      <footer className="shrink-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-2 safe-pb">
        <div className="max-w-4xl mx-auto flex items-end gap-2 p-2">
          <button className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Icon name="add_circle" size={24} />
          </button>
          <div className="flex-1 bg-gray-100 dark:bg-[#101922] rounded-2xl flex items-center min-h-[44px] px-4 border border-transparent focus-within:border-primary/50 transition-all">
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                className="w-full bg-transparent border-none p-0 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-0 resize-none py-2.5 max-h-32" 
                placeholder="Спросите о нормах монтажа..." 
                rows={1}
            />
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all active:scale-95 ${input.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}
          >
            <Icon name="arrow_upward" size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};