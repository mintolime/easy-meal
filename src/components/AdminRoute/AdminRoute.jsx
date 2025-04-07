import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div>Проверка доступа...</div>;
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;