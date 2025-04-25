import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BACKEND } from '../config';
import { Auth } from '../api/AuthApi';
import useNotification from './useNotification';


export const useAuth = () => {
  const { showNotificationAnt } = useNotification();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    isEmailUser: '',
    isAdminUser: false,
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const apiAuth = useMemo(() => new Auth({
    url: API_BACKEND,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }), []);

  const checkToken = useCallback(async (jwt) => {
    try {
      const res = await apiAuth.checkToken(jwt);
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser({
        isEmailUser: res.email,
        isAdminUser: res.isAdmin,
      });
      navigate(location.pathname, { replace: true });
      return true;
    } catch (err) {
      // Обработка ошибок
      return false;
    }
  }, [apiAuth, navigate, location.pathname]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsLoading(false);
      return;
    }
    
    checkToken(jwt);
  }, [checkToken]);

  const handleRegistration = useCallback(async (data) => {
    try {
      await apiAuth.register(data);
      navigate('/signin', { replace: true });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [apiAuth, navigate]);

  const handleAuthorization = (data) => {
        return apiAuth
            .authorize(data)
            .then((data) => {
                setIsLoggedIn(true);
                showNotificationAnt('success', 'Рады Вас видеть снова!');
                localStorage.setItem('jwt', data.token);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                showNotificationAnt('error', err.errorText);
                console.log(`Что-то пошло не так: ошибка запроса статус ${err.status}, сообщение ${err.errorText} 😔`);
                setIsLoggedIn(false);
            });
    };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUser({
      isEmailUser: '',
      isAdminUser: false,
    });
    navigate('/signin', { replace: true });
  }, [navigate]);

  return {
    isLoggedIn,
    isLoading,
    user,
    handleRegistration,
    handleAuthorization,
    handleLogout,
    checkToken,
  };
};