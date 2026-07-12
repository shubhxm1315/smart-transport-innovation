import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/vehicles/VehicleList';
import DriverList from './pages/drivers/DriverList';
import RouteList from './pages/routes/RouteList';
import TripList from './pages/trips/TripList';
import TripTracking from './pages/trips/TripTracking';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/oauth2/callback" element={<OAuthCallback />} />
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={
          <ProtectedRoute roles={['ADMIN', 'DISPATCHER', 'DRIVER']}>
            <VehicleList />
          </ProtectedRoute>
        } />
        <Route path="/drivers" element={
          <ProtectedRoute roles={['ADMIN', 'DISPATCHER']}>
            <DriverList />
          </ProtectedRoute>
        } />
        <Route path="/routes" element={<RouteList />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/:id/tracking" element={<TripTracking />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
