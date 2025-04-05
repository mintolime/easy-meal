import { useEffect } from 'react';
import { useAdminStore } from '../stores/adminStore';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div>Проверка доступа...</div>;
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;