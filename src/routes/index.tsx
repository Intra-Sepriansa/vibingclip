import { Navigate, createBrowserRouter } from 'react-router-dom';
import { LandingLayout } from '../layouts/LandingLayout';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ProjectDetailPage } from '../pages/ProjectDetail/ProjectDetailPage';
import { ClipEditorPage } from '../pages/ClipEditor/ClipEditorPage';
import { AnalyticsPage } from '../pages/Analytics/AnalyticsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [{ index: true, element: <LandingPage /> }]
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'projects', element: <DashboardPage /> },
      { path: 'projects/:projectId', element: <ProjectDetailPage /> },
      { path: 'projects/:projectId/clips/:clipId', element: <ClipEditorPage /> },
      { path: 'analytics', element: <AnalyticsPage /> }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);
