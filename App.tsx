import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { ChatScreen } from './screens/ChatScreen';
import { DocsScreen } from './screens/DocsScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { Onboarding } from './components/Onboarding';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden relative">
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('has_onboarded');
    if (!hasOnboarded) {
        setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
      localStorage.setItem('has_onboarded', 'true');
      setShowOnboarding(false);
  };

  return (
    <>
        {showOnboarding && <Onboarding onComplete={completeOnboarding} />}
        <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<ChatScreen />} />
            <Route path="docs" element={<DocsScreen />} />
            <Route path="subscription" element={<SubscriptionScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="admin" element={<AdminScreen />} />
            </Route>
        </Routes>
        </Router>
    </>
  );
};

export default App;