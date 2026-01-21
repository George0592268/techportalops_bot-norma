import React, { useState, useRef } from 'react';
import { Icon } from '../components/Icon';
import { AdminStats } from '../types';

interface UploadedFile {
    name: string;
    size: string;
    date: string;
    type: 'pdf' | 'txt';
}

export const AdminScreen: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    openRouterStatus: 'connected',
    latency: 120,
    balance: 12.50,
    indexingProgress: 45
  });
  
  const [files, setFiles] = useState<UploadedFile[]>([
    {name: 'security_protocol_v2.pdf', size: '2.4 MB', date: 'Сегодня, 14:30', type: 'pdf'},
    {name: 'server_config_prod.txt', size: '14 KB', date: 'Вчера, 18:45', type: 'txt'},
    {name: 'gost_r_53325.pdf', size: '5.1 MB', date: '12 Окт', type: 'pdf'}
  ]);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setUploadProgress(0);

      // Simulate upload and indexing
      const interval = setInterval(() => {
          setUploadProgress(prev => {
              if (prev >= 100) {
                  clearInterval(interval);
                  setUploading(false);
                  
                  // Add new file
                  const newFile: UploadedFile = {
                      name: file.name,
                      size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
                      date: 'Только что',
                      type: file.name.endsWith('.txt') ? 'txt' : 'pdf'
                  };
                  setFiles(prevFiles => [newFile, ...prevFiles]);
                  
                  // Update stats simulation
                  setStats(prevStats => ({
                      ...prevStats,
                      indexingProgress: 100
                  }));
                  
                  return 100;
              }
              return prev + 5;
          });
      }, 100);
  };

  const deleteFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-y-auto">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-surface-dark/95 backdrop-blur-md px-4 py-3 border-b border-surface-border">
         <h1 className="text-lg font-bold text-white">Админ. панель</h1>
         <div className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20">ADMIN MODE</div>
      </header>

      <main className="p-4 space-y-6">
        {/* OpenRouter Stats */}
        <section className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-border bg-white/5 flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">OpenRouter API</h3>
                <Icon name="hub" className="text-gray-500" size={16} />
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-2xl font-bold text-white">${stats.balance.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Баланс</div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-emerald-500 text-xs font-mono font-bold">{stats.latency}ms</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Mistral 7B Instruct</div>
                </div>
            </div>
        </section>

        {/* Vector DB Indexing */}
        <section className="flex flex-col gap-2">
            <div className="flex justify-between items-end px-1">
                <p className="text-sm font-medium text-white">
                    {uploading ? 'Индексация нового документа...' : 'Индексация в Vector DB (Pinecone)'}
                </p>
                <span className="text-primary text-xs font-bold">
                    {uploading ? uploadProgress : stats.indexingProgress}%
                </span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface-dark border border-surface-border overflow-hidden">
                <div 
                    className="h-full rounded-full bg-primary relative overflow-hidden transition-all duration-300" 
                    style={{width: `${uploading ? uploadProgress : stats.indexingProgress}%`}}
                >
                    {(uploading || stats.indexingProgress < 100) && (
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[spin_2s_linear_infinite]" style={{backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem'}}></div>
                    )}
                </div>
            </div>
            <p className="text-xs text-gray-500 px-1">
                {uploading ? 'Обработка векторов...' : 'Система готова к запросам'}
            </p>
        </section>

        {/* Upload Area */}
        <section className="space-y-3">
            <h2 className="text-lg font-bold text-white px-1">Загрузка документов</h2>
            <div 
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`group relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-surface-border bg-surface-dark/30 hover:bg-surface-dark hover:border-primary/50 transition-all cursor-pointer px-6 py-10 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    className="hidden" 
                    accept=".pdf,.txt"
                />
                <div className="h-14 w-14 rounded-full bg-surface-border flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {uploading ? <Icon name="sync" className="animate-spin" size={30} /> : <Icon name="upload_file" size={30} />}
                </div>
                <div className="text-center">
                    <p className="text-white font-medium">{uploading ? 'Загрузка...' : 'Нажмите для выбора'}</p>
                    <p className="text-xs text-gray-500">Поддерживаются .pdf и .txt</p>
                </div>
            </div>
        </section>

        {/* File List */}
        <section className="space-y-3">
             <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-white">Активные нормативы</h2>
                <span className="text-xs bg-surface-dark border border-surface-border px-2 py-1 rounded text-gray-400">{files.length} файла</span>
             </div>
             <div className="flex flex-col bg-surface-dark rounded-xl border border-surface-border divide-y divide-surface-border">
                {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 gap-3 group hover:bg-white/5 transition-colors animate-[fadeIn_0.3s_ease-out]">
                         <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`h-10 w-10 shrink-0 rounded flex items-center justify-center border ${file.type === 'pdf' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                <Icon name={file.type === 'pdf' ? 'picture_as_pdf' : 'description'} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                            </div>
                         </div>
                         <button onClick={() => deleteFile(i)} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                            <Icon name="delete" />
                         </button>
                    </div>
                ))}
             </div>
        </section>
        
        {/* OpenRouter Config Mock */}
        <section className="bg-surface-dark border border-surface-border rounded-xl p-4 space-y-4">
             <h2 className="text-sm font-bold text-gray-400 uppercase">Model Configuration</h2>
             <div className="space-y-2">
                <label className="text-xs text-gray-300">System Prompt</label>
                <textarea className="w-full bg-background-dark border border-surface-border rounded-lg p-3 text-xs font-mono text-gray-300 h-24 focus:ring-1 focus:ring-primary focus:border-primary" defaultValue="You are an expert OPS consultant. Use only provided context from Vector DB..." />
             </div>
             <div className="space-y-2">
                 <div className="flex justify-between">
                     <label className="text-xs text-gray-300">Temperature</label>
                     <span className="text-xs font-mono text-primary">0.7</span>
                 </div>
                 <input type="range" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
             </div>
             <button className="w-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-3 rounded-lg">
                 Save Configuration
             </button>
        </section>
      </main>
    </div>
  );
};