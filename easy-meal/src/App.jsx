/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import './App.css';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Recipe from './components/Recipe/Recipe';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SavedRecipes from './components/SavedRecipes/SavedRecipes';
import NotFound from './components/NotFound/NotFound';
import ShoppingList from './components/ShoppingList/ShoppingList';
import { API_BACKEND, footerRoutes, headerRoutes } from './utils/config';
import { checkPath } from './utils/functions';
import { Auth } from './utils/api/AuthApi';
import { MainApi } from './utils/api/MainApi';
import { initialRecipes } from './utils/constants';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailUser, setIsEmailUser] = useState({ email: '' });
  // проверка для отображения
  const headerView = checkPath(headerRoutes, location);
  const footerView = checkPath(footerRoutes, location);

  const [recipe, setRecipe] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  // const notifyToRegister = () => {
  //   messageApi.warning(
  //     'Войдите или зарегистрируйтесь, чтобы сохранять рецепты в избранное'
  //   );
  // };
 
  const showNotificationAnt = (type,message) => {
    messageApi[type](
      `${message}`
    );
  };

  // const getRandomRecipe = () => {
  //   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  //     .then((data) => data.json())
  //     .then((randRecipe) => {
  //       console.log(randRecipe);
  //       const newRecipe = modifyRecipeObject(randRecipe.meals[0]);
  //       setRecipe(newRecipe);

  //       if (location.pathname !== '/recipe') {
  //         navigate('/recipe');
  //       }
  //     });
  // };

  const handleSetRecipe = (newRecipe) => {
    setRecipe(newRecipe);
    navigate('/recipe');
  };

  // Временно только 10 рецептов передаются из initialRecipes
  const getRandomRecipe = () => {
    const index = Math.floor(Math.random() * (initialRecipes.meals.length - 1));
    const randomRecipe = initialRecipes.meals[index];
    const modifiedRecipe = modifyRecipeObject(randomRecipe);
    if (modifiedRecipe.mealId == recipe.mealId) {
      getRandomRecipe();
    } else {
      setRecipe(modifiedRecipe);
    }
  };

  const modifyRecipeObject = (value) => {
    let ingredients = [];

    for (let i = 1; i <= 30; i++) {
      let ingredient = value[`strIngredient${i}`];
      let measure = value[`strMeasure${i}`];

      if (ingredient !== '' && measure !== '') {
        ingredients.push({ ingredient, measure });
      } else {
        break;
      }
    }

    const newRecipe = {
      mealName: value.strMeal,
      mealId: value.idMeal,
      mealCategory: value.strCategory,
      youtubeLink: value.strYoutube,
      imageLink: value.strMealThumb,
      instructions: value.strInstructions,
      ingredients
    };

    return newRecipe;
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);

  const getRecipe = () => {
    navigate('/recipe');
  };

  // API //
  const apiAuth = new Auth({
    url: API_BACKEND,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  const mainApi = new MainApi({
    url: API_BACKEND,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  useEffect(() => {
    isLoggedIn &&
      mainApi.getSavedRecipes().then((recipes) => {
        setLikedRecipes(recipes);
      });
  }, [isLoggedIn]);

  React.useEffect(() => {
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
          if (err.status === 401) {
            setIsLoading(false);
            localStorage.removeItem('jwt');
            navigate('/signin', { replace: true });
          }
          console.log(
            `Что-то пошло не так: ошибка запроса статус ${err.status},
            сообщение ${err.errorText} 😔`
          );
        });
    };

    //тут проверяем, если токен корректный то вызываем запрос с задержкой 2 секунды
    if (jwt) {
      setTimeout(delayedCheckToken, 2000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleRegistration = (data) => {
    return apiAuth
      .register(data)
      .then((res) => {
        showNotificationAnt('success','Успешно!')
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        showNotificationAnt('error',err.errorText)
        console.log(
          `Что-то пошло не так: ошибка запроса статус ${err.status}, сообщение ${err.errorText} 😔`
        );
      });
  };

  const handleAuthorization = (data) => {
    return apiAuth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        
        showNotificationAnt('success','Успешно!')
        localStorage.setItem('jwt', data.token);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        showNotificationAnt('error',err.errorText)
        console.log(
          `Что-то пошло не так: ошибка запроса статус ${err.status}, сообщение ${err.errorText} 😔`
        );
        setIsLoggedIn(false);
        // setIsRegistration(false);
        // handleRegistrationSuccess();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
    setIsLoggedIn(false);
  };

  // --- Recipes API methods ---
  const handleSaveRecipe = (recipe, id, isLiked) => {
    if (isLoggedIn) {
      if (!isLiked) {
        mainApi.saveRecipe(recipe).then((newRecipe) => {
          setLikedRecipes([...likedRecipes, newRecipe]);
        });
      } else {
        handleDeleteRecipe(id);
      }
    } else {
      showNotificationAnt('warning','Войдите или зарегистрируйтесь, чтобы сохранять рецепты в избранное')
    }
  };

  const handleDeleteRecipe = (id) => {
    mainApi.deleteRecipe(id).then((res) => {
      const updatedLikedRecipes = likedRecipes.filter(
        (r) => r.mealId !== res.mealId
      );
      setLikedRecipes(updatedLikedRecipes);
    });
  };

  return (
    <>
      {headerView && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      {contextHolder}

      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Main getRecipe={getRecipe} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegistration} />}
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleAuthorization} />}
          />
          <Route
            path="/recipe"
            element={
              <Recipe
                recipe={recipe}
                likedRecipes={likedRecipes}
                getRandomRecipe={getRandomRecipe}
                saveRecipe={handleSaveRecipe}
              />
            }
          />
          <Route
            path="/saved-recipes"
            element={
              <SavedRecipes
                likedRecipes={likedRecipes}
                onDeleteRecipe={handleDeleteRecipe}
                onSetRecipe={handleSetRecipe}
              />
            }
          />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {footerView && <Footer />}
    </>
  );
}

export default App;
