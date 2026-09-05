import React, { useState, useEffect } from 'react';
import { UserProfile, DetectionResult } from './types';
import { subscribeToAuthChanges, logoutUser, checkRedirectResult } from './firebase/auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { TeamPage } from './pages/TeamPage';
import { ResultsAnalysisPage } from './pages/ResultsAnalysisPage';
import { ResultCard } from './components/ResultCard';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedDetection, setSelectedDetection] = useState<DetectionResult | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    // Check if redirect result is present
    checkRedirectResult().then(redirectUser => {
      if (redirectUser) {
        setUser({
          uid: redirectUser.uid,
          name: redirectUser.displayName || redirectUser.email?.split('@')[0] || 'Researcher',
          email: redirectUser.email || '',
          photoURL: redirectUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
        setCurrentTab('dashboard');
      }
    });

    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Researcher',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      } else {
        // Check if demo user is stored in localStorage
        const storedDemo = localStorage.getItem('capstone_demo_user');
        if (storedDemo) {
          try {
            setUser(JSON.parse(storedDemo));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
    setCurrentTab('dashboard');
  };

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      uid: 'capstone-researcher-192521063',
      name: 'Manu Neethi S (Evaluator)',
      email: 'sugantharaj91@gmail.com',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    localStorage.setItem('capstone_demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
    setCurrentTab('dashboard');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.warn('Logout fallback:', e);
    }
    localStorage.removeItem('capstone_demo_user');
    setUser(null);
    setCurrentTab('landing');
    setSelectedDetection(null);
  };

  const handleNavigateToDashboard = () => {
    setSelectedDetection(null);
    setCurrentTab(user ? 'dashboard' : 'login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedDetection(null);
          setCurrentTab(tab);
        }}
        user={user}
        onLoginClick={() => setCurrentTab('login')}
        onLogoutClick={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedDetection ? (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <button
              onClick={() => setSelectedDetection(null)}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to Detection History</span>
            </button>
            <ResultCard
              result={selectedDetection}
              savedToFirestore={true}
              onScanAnother={() => {
                setSelectedDetection(null);
                setCurrentTab('dashboard');
              }}
            />
          </div>
        ) : (
          <>
            {currentTab === 'landing' && (
              <LandingPage
                user={user}
                onAnalyzeClick={handleNavigateToDashboard}
                onAboutClick={() => setCurrentTab('about')}
                onTeamClick={() => setCurrentTab('team')}
                onResultsClick={() => setCurrentTab('results')}
              />
            )}

            {currentTab === 'login' && (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onDemoLogin={handleDemoLogin}
              />
            )}

            {currentTab === 'dashboard' && (
              user ? (
                <DashboardPage
                  user={user}
                  onNavigateToHistory={() => setCurrentTab('history')}
                />
              ) : (
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onDemoLogin={handleDemoLogin}
                />
              )
            )}

            {currentTab === 'history' && (
              user ? (
                <HistoryPage
                  user={user}
                  onSelectDetection={(d) => setSelectedDetection(d)}
                  onNavigateToDashboard={() => setCurrentTab('dashboard')}
                />
              ) : (
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onDemoLogin={handleDemoLogin}
                />
              )
            )}

            {currentTab === 'about' && <AboutPage />}
            {currentTab === 'architecture' && <ArchitecturePage />}
            {currentTab === 'results' && <ResultsAnalysisPage />}
            {currentTab === 'team' && <TeamPage />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
