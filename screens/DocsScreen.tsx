import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { Regulation } from '../types';

const REGULATIONS: Regulation[] = [
  { 
    id: '1', 
    code: 'СП 484.1311500.2020', 
    title: 'Системы противопожарной защиты. Системы пожарной сигнализации.', 
    updatedAt: '12.10.2023', 
    type: 'SP',
    content: `6.6.15. Расстояние между точечными пожарными извещателями должно быть не более нормативного, но не превышать половины зоны контроля извещателя.\n\nПри ширине коридора до 2 метров расстояние между извещателями может быть увеличено до 15 метров.`
  },
  { 
    id: '2', 
    code: 'ГОСТ Р 53325-2012', 
    title: 'Техника пожарная. Технические средства пожарной автоматики.', 
    updatedAt: '15.09.2023', 
    type: 'GOST',
    content: `4.2.1.1. Пожарные извещатели должны обеспечивать выдачу извещения о пожаре при воздействии на них факторов пожара, превышающих установленные пороговые значения.`
  },
  { 
    id: '3', 
    code: 'ФЗ № 123-ФЗ', 
    title: 'Технический регламент о требованиях пожарной безопасности.', 
    updatedAt: '01.01.2024', 
    type: 'FZ',
    content: `Статья 83. Требования к системам автоматического пожаротушения и системам пожарной сигнализации.\n1. Автоматические установки пожаротушения и пожарной сигнализации должны монтироваться в зданиях и сооружениях в соответствии с проектной документацией.`
  },
  { 
    id: '4', 
    code: 'СП 5.13130.2009', 
    title: 'Системы противопожарной защиты. Установки пожарной сигнализации.', 
    updatedAt: 'Не действует', 
    type: 'SP', 
    isArchived: true,
    content: `Документ утратил силу. Используйте СП 484.1311500.2020.`
  },
];

export const DocsScreen: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Regulation | null>(null);

  const filteredDocs = REGULATIONS.filter(doc => {
    const matchesSearch = doc.code.toLowerCase().includes(search.toLowerCase()) || doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                          (filter === 'archive' && doc.isArchived) || 
                          (filter !== 'archive' && !doc.isArchived && doc.type.toLowerCase() === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative">
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 pt-2">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
             <h1 className="text-xl font-bold flex-1">База нормативов</h1>
             <button className="p-2 bg-white dark:bg-surface-dark rounded-full shadow-sm">
                <Icon name="filter_list" />
             </button>
        </div>
        
        <div className="px-4 pb-3">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon name="search" className="text-gray-400 group-focus-within:text-primary" />
                </div>
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full h-12 pl-10 pr-4 rounded-xl border-none bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary shadow-sm text-base"
                    placeholder="Поиск по номеру или названию..."
                />
            </div>
        </div>

        <div className="px-4 pb-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
                {[
                    {id: 'all', label: 'Все'},
                    {id: 'sp', label: 'СП'},
                    {id: 'gost', label: 'ГОСТ'},
                    {id: 'fz', label: 'ФЗ'},
                    {id: 'archive', label: 'Архив'}
                ].map(tag => (
                    <button 
                        key={tag.id}
                        onClick={() => setFilter(tag.id)}
                        className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-lg font-medium text-sm transition-all active:scale-95 ${
                            filter === tag.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5'
                        }`}
                    >
                        {tag.label}
                    </button>
                ))}
            </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 pb-24 overflow-y-auto">
        {filteredDocs.map(doc => (
            <article 
                key={doc.id} 
                onClick={() => setSelectedDoc(doc)}
                className={`group flex flex-col gap-3 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 transition-all active:scale-[0.98] cursor-pointer ${doc.isArchived ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
                <div className="flex items-start gap-4">
                    <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 border ${
                        doc.type === 'SP' ? 'bg-blue-50 dark:bg-blue-500/10 text-primary border-blue-100 dark:border-blue-500/20' :
                        doc.type === 'GOST' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20' :
                        'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
                    }`}>
                        <Icon name={doc.isArchived ? 'inventory_2' : 'description'} />
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="text-gray-900 dark:text-white text-base font-bold leading-tight truncate pr-2">{doc.code}</h3>
                            {doc.isArchived && <span className="text-[10px] uppercase font-bold bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">Архив</span>}
                        </div>
                        <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                            <Icon name="update" size={14} />
                            Обновлено: {doc.updatedAt}
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                            {doc.title}
                        </p>
                    </div>
                </div>
                <div className="mt-1 flex items-center justify-end pt-3 border-t border-gray-100 dark:border-white/5">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary bg-primary/10 hover:bg-primary/20 active:bg-primary/25 transition-colors text-sm font-semibold w-full justify-center sm:w-auto">
                        <Icon name="auto_awesome" size={18} />
                        <span>Краткая суть</span>
                    </button>
                </div>
            </article>
        ))}
      </main>

      <div className="fixed bottom-20 right-6 z-40">
        <button className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-90">
            <Icon name="add" size={28} />
        </button>
      </div>

      {/* Doc Detail Modal */}
      {selectedDoc && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background-light dark:bg-background-dark animate-[fadeIn_0.2s_ease-out]">
            <header className="shrink-0 flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md">
                <button onClick={() => setSelectedDoc(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                    <Icon name="arrow_back" />
                </button>
                <div className="flex-1 px-4 truncate">
                    <h2 className="text-base font-bold truncate">{selectedDoc.code}</h2>
                    <p className="text-xs text-gray-500 truncate">{selectedDoc.title}</p>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                    <Icon name="share" />
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-5 pb-24">
                <div className="prose dark:prose-invert prose-sm max-w-none">
                    <div className="flex gap-2 mb-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${selectedDoc.type === 'SP' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                            {selectedDoc.type}
                        </span>
                        {selectedDoc.isArchived && (
                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
                                Утратил силу
                            </span>
                        )}
                    </div>
                    <h1 className="text-xl font-bold mb-4">{selectedDoc.title}</h1>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-white/5 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedDoc.content || "Текст документа загружается из векторной базы данных..."}
                    </div>
                </div>
            </main>
             <div className="absolute bottom-6 left-6 right-6 z-50">
                <button 
                    onClick={() => setSelectedDoc(null)}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-12 rounded-xl flex items-center justify-center shadow-lg"
                >
                    Закрыть
                </button>
             </div>
        </div>
      )}
    </div>
  );
};