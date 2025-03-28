/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { mockRecipes, mockUser, mockLikedRecipes } from './utils/mockData';

import './App.css';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Recipe from './components/Recipe/Recipe';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecipesList from './components/RecipesList/RecipesList';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewRecipe from './components/RecipeForm/RecipeForm';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { MainPageAsync } from './components/Main/Main.async';
import { RecipePageAsync } from './components/Recipe/Recipe.async';
import { Suspense } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    isEmailUser: '',
    isAdminUser: false,
  });
  
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipe, setRecipe] = useState(mockRecipes[0]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const showNotificationAnt = (type, message) => {
    messageApi[type](`${message}`);
  };

  // Инициализация данных
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser({
          isEmailUser: mockUser.email,
          isAdminUser: mockUser.isAdmin
        });
        setAllRecipes(mockRecipes);
        setLikedRecipes(mockLikedRecipes);
      }, 200);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * mockRecipes.length);
    setRecipe(mockRecipes[randomIndex]);
  };
  const getRecipe = () => {
    navigate('/recipe');
  };
  const handleSetRecipe = (newRecipe) => {
    setRecipe(newRecipe);
    navigate('/recipe');
  };

  const handleRegistration = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        showNotificationAnt('success', 'Успешно!');
        navigate('/signin', { replace: true });
        resolve();
      }, 500);
    });
  };

  const handleAuthorization = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoggedIn(true);
        showNotificationAnt('success', 'Рады Вас видеть снова!');
        localStorage.setItem('jwt', 'mock-token');
        setUser({
          isEmailUser: mockUser.email,
          isAdminUser: mockUser.isAdmin
        });
        setAllRecipes(mockRecipes);
        setLikedRecipes(mockLikedRecipes);
        navigate('/', { replace: true });
        resolve();
      }, 500);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
    setIsLoggedIn(false);
    setUser({
      isEmailUser: '',
      isAdminUser: false,
    });
  };

  const handleCreateRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      _id: Date.now().toString(),
      likes: []
    };
    setAllRecipes([...allRecipes, newRecipe]);
    showNotificationAnt('success', 'Рецепт успешно создан!');
  };

  const handleUpdateRecipe = (id, updatedRecipe) => {
    setAllRecipes(allRecipes.map(r => r._id === id ? updatedRecipe : r));
    showNotificationAnt('success', 'Рецепт обновлен!');
  };

  const handleDeleteRecipe = (recipe) => {
    setAllRecipes(allRecipes.filter(r => r._id !== recipe._id));
    showNotificationAnt('success', 'Рецепт удален!');
  };

  const handleLikeRecipe = (recipe, isLiked) => {
    if (!isLiked) {
      const updatedRecipe = {
        ...recipe,
        likes: [...recipe.likes, 'current-user']
      };
      setLikedRecipes([...likedRecipes, updatedRecipe]);
    } else {
      handleDislikeRecipe(recipe);
    }
  };

  const handleDislikeRecipe = (recipe) => {
    setLikedRecipes(likedRecipes.filter(r => r._id !== recipe._id));
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        isCurrentUser={user}
        onLogout={handleLogout}
      />
      {contextHolder}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPageAsync getRecipe={getRecipe} />} />
          <Route path="/signup" element={<Register onRegister={handleRegistration} />} />
          <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />
          <Route
            path="/recipe"
            element={
              <RecipePageAsync
                recipe={recipe}
                likedRecipes={likedRecipes}
                getRandomRecipe={getRandomRecipe}
                onLikeRecipe={handleLikeRecipe}
              />
            }
          />
          <Route
            path="/saved-recipes"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={RecipesList}
                recipes={likedRecipes}
                onDeleteRecipe={handleDislikeRecipe}
                onSetRecipe={handleSetRecipe}
              />
            }
          />
          <Route
            path="/new-recipe"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={NewRecipe}
                onCreateRecipe={handleCreateRecipe}
                onUpdateRecipe={handleUpdateRecipe}
              />
            }
          />

          {user.isAdminUser && (
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={AdminPanel}
                  recipes={allRecipes}
                  onSetRecipe={handleSetRecipe}
                  onDeleteRecipe={handleDeleteRecipe}
                  onCreateRecipe={handleCreateRecipe}
                  onUpdateRecipe={handleUpdateRecipe}
                />
              }
            />
          )}
          <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;