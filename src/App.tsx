import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import TasksPage from './pages/TasksPage';
import TeamPage from './pages/TeamPage';
import DocumentsPage from './pages/DocumentsPage';
import DailyLogsPage from './pages/DailyLogsPage';
import RFIsPage from './pages/RFIsPage';
import ChangeOrdersPage from './pages/ChangeOrdersPage';
import BudgetPage from './pages/BudgetPage';
import SubcontractorsPage from './pages/SubcontractorsPage';
import SchedulePage from './pages/SchedulePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ClientPortal from './pages/ClientPortal';
import ActivityFeed from './pages/ActivityFeed';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';

export type Page = 'landing' | 'login' | 'onboarding' | 'dashboard' | 'projects' | 'project-detail' | 'tasks' | 'team' |
  'documents' | 'daily-logs' | 'rfis' | 'change-orders' | 'budget' | 'subcontractors' |
  'schedule' | 'reports' | 'settings' | 'admin' | 'subscription' | 'client-portal' | 'activity';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('p1');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (page: Page, projectId?: string) => {
    if (projectId) setSelectedProjectId(projectId);
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleOnboardingComplete = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    if (currentPage === 'onboarding') {
      return <OnboardingPage onComplete={handleOnboardingComplete} onBack={() => setCurrentPage('login')} />;
    }
    if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} onRegister={() => setCurrentPage('onboarding')} />;
    }
    return (
      <div key="landing">
        <LandingPage
          onLogin={() => setCurrentPage('login')}
          onRegister={() => setCurrentPage('onboarding')}
        />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard navigateTo={navigateTo} />;
      case 'projects': return <ProjectsPage navigateTo={navigateTo} />;
      case 'project-detail': return <ProjectDetail projectId={selectedProjectId} navigateTo={navigateTo} />;
      case 'tasks': return <TasksPage />;
      case 'team': return <TeamPage />;
      case 'documents': return <DocumentsPage />;
      case 'daily-logs': return <DailyLogsPage />;
      case 'rfis': return <RFIsPage />;
      case 'change-orders': return <ChangeOrdersPage />;
      case 'budget': return <BudgetPage />;
      case 'subcontractors': return <SubcontractorsPage />;
      case 'schedule': return <SchedulePage />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      case 'admin': return <AdminPage />;
      case 'subscription': return <SubscriptionPage />;
      case 'client-portal': return <ClientPortal />;
      case 'activity': return <ActivityFeed />;
      default: return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0c11] overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        navigateTo={navigateTo}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          navigateTo={navigateTo}
          onLogout={() => { setIsLoggedIn(false); setCurrentPage('landing'); }}
        />
        <main className="flex-1 overflow-y-auto bg-[#0a0c11]">
          <div key={currentPage + selectedProjectId} className="anim-page-in min-h-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
