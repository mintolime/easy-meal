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

  useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        //обертка функция
        const delayedCheckToken = () => {
            apiAuth
                .checkToken(jwt)
                .then(() => {
                    setIsLoggedIn(true);
                    setIsLoading(false);
                 
                    navigate(location.pathname, { replace: true });
                })
                .catch((err) => {
                    if (err.status === 401 || err.status === undefined) {
                        setIsLoading(false);
                        localStorage.removeItem('jwt');
                        navigate('/', { replace: true });
                    }
                    console.log(
                        `Что-то пошло не так: ошибка запроса статус ${err.status},
            сообщение ${err.errorText} 😔`,
                    );
                });
        };

        //тут проверяем, если токен корректный то вызываем запрос с задержкой 2 секунды
        if (jwt) {
            setTimeout(delayedCheckToken, 200);
        } else {
            setIsLoading(false);
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/signin', { replace: true });
        setIsLoggedIn(false);
        setUser((prevUser) => ({
            ...prevUser,
            isEmailUser: '',
            isAdminUser: false,
        }));
    };

  return {
    isLoggedIn,
    isLoading,
    user,
    setUser,
    handleRegistration,
    handleAuthorization,
    handleLogout,
  };
};