import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BACKEND } from '../../utils/config';
import { AuthAdmin } from '../../utils/api/AdminApi';

const auth = new AuthAdmin({
  url: API_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  },
});

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await auth.checkAdmin();
        setIsAdmin(true);
      } catch {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Проверка прав доступа...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
