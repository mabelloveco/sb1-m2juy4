import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Register from './components/Register';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';
import LoginModal from './components/auth/LoginModal';
import { useAuthStore } from './store/authStore';

// Lazy load components
const Feed = React.lazy(() => import('./components/Feed'));
const Discover = React.lazy(() => import('./components/Discover'));
const Marketplace = React.lazy(() => import('./components/Marketplace'));
const Events = React.lazy(() => import('./components/Events'));
const Communities = React.lazy(() => import('./components/Communities'));
const Messages = React.lazy(() => import('./components/Messages'));
const Profile = React.lazy(() => import('./components/Profile'));
const MemeGenerator = React.lazy(() => import('./components/MemeGenerator'));

function App() {
  const { isAuthenticated } = useAuthStore();
  const [currentView, setCurrentView] = React.useState('feed');
  const [isHydrated, setIsHydrated] = React.useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Register />
        <LoginModal />
        <Toaster position="top-center" />
      </>
    );
  }

  const renderView = () => {
    const views = {
      feed: <Feed />,
      discover: <Discover />,
      marketplace: <Marketplace />,
      events: <Events />,
      communities: <Communities />,
      messages: <Messages />,
      profile: <Profile />,
      memes: <MemeGenerator />,
    };
    return views[currentView as keyof typeof views];
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
          <main className="flex-1 max-w-4xl mx-auto px-4 py-6">
            <Suspense fallback={<LoadingSpinner />}>
              {renderView()}
            </Suspense>
          </main>
        </div>
        <Toaster position="top-center" />
      </div>
    </ErrorBoundary>
  );
}

export default App;