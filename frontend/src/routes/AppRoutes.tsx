import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ApplicationsPage from '../pages/applications/ApplicationsPage';
import CreateApplicationPage from '../pages/applications/CreateApplicationPage';
import ApplicationDetailsPage from '../pages/applications/ApplicationDetailsPage';
import InterviewsPage from '../pages/applications/InterviewsPage';
import RemindersPage from '../pages/applications/RemindersPage';
import NotFoundPage from '../pages/applications/NotFoundPage';
import Layout from '../components/layout/Layout';
import authService from '../services/authService';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/applications" element={
        <ProtectedRoute>
          <ApplicationsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/applications/create" element={
        <ProtectedRoute>
          <CreateApplicationPage />
        </ProtectedRoute>
      } />
      
      <Route path="/applications/:id" element={
        <ProtectedRoute>
          <ApplicationDetailsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/interviews" element={
        <ProtectedRoute>
          <InterviewsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/reminders" element={
        <ProtectedRoute>
          <RemindersPage />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
