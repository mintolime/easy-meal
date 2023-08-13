/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

import "./App.css";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Recipe from "./components/Recipe/Recipe";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RecipesList from "./components/RecipesList/RecipesList";
import NotFound from "./components/NotFound/NotFound";
import { API_BACKEND, footerRoutes, headerRoutes } from "./utils/config";
import { checkPath } from "./utils/functions";
import { Auth } from "./utils/api/AuthApi";
import { MainApi } from "./utils/api/MainApi";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NewRecipe from "./components/RecipeForm/RecipeForm";
import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // единый стейт для пользователя
  const [user, setUser] = useState({
    isEmailUser: "",
    isAdminUser: false,
  });
  // проверка для отображения
  const headerView = checkPath(headerRoutes, location);
  const footerView = checkPath(footerRoutes, location);

  const [allRecipes, setAllRecipes] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const showNotificationAnt = (type, message) => {
    messageApi[type](`${message}`);
  };

  const handleSetRecipe = (newRecipe) => {
    setRecipe(newRecipe);
    navigate("/recipe");
  };

  const getRandomRecipe = () => {
    mainApi
      .getRandomRecipe()
      .then((randomRecipe) => {
        if (recipe._id === randomRecipe._id) {
          getRandomRecipe();
        } else {
          setRecipe(randomRecipe);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);

  const getRecipe = () => {
    navigate("/recipe");
  };

  // API //
  const apiAuth = new Auth({
    url: API_BACKEND,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  const mainApi = new MainApi({
    url: API_BACKEND,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  useEffect(() => {
    isLoggedIn &&
      mainApi.getSavedRecipes().then((user) => {
        setLikedRecipes(user.likes);
      });

    isLoggedIn &&
      mainApi
        .getRecipes()
        .then((recipes) => {
          setAllRecipes(recipes);
        })
        .catch((err) => console.log(err));
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    //обертка функция
    const delayedCheckToken = () => {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setIsLoading(false);
          console.log("token", res);
          setUser((prevUser) => ({
            ...prevUser,
            isAdminUser: true,
            isEmailUser: res.email,
          }));
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => {
          if (err.status === 401 || err.status === undefined) {
            setIsLoading(false);
            localStorage.removeItem("jwt");
            navigate("/", { replace: true });
          }
          console.log(
            `Что-то пошло не так: ошибка запроса статус ${err.status},
            сообщение ${err.errorText} 😔`
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

  const handleRegistration = (data) => {
    return apiAuth
      .register(data)
      .then((res) => {
        showNotificationAnt("success", "Успешно!");
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        showNotificationAnt("error", err.errorText);
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
        showNotificationAnt("success", "Рады Вас видеть снова!");

        apiAuth.checkToken(data.token).then((res) => {
          setUser((prevUser) => ({
            ...prevUser,
            isAdminUser: true,
            isEmailUser: res.email,
          }));
          console.log("login", res);
        });
        
        localStorage.setItem("jwt", data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        showNotificationAnt("error", err.errorText);
        console.log(
          `Что-то пошло не так: ошибка запроса статус ${err.status}, сообщение ${err.errorText} 😔`
        );
        setIsLoggedIn(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
    setIsLoggedIn(false);
    setUser((prevUser) => ({
      ...prevUser,
      isEmailUser: "",
      isAdminUser: false,
    }));
  };

  // --- Recipes API methods ---
  const handleCreateRecipe = (recipe) => {
    if (isLoggedIn) {
      mainApi
        .createRecipe(recipe)
        .then((newRecipe) => {
          showNotificationAnt("success", "Рецепт успешно создан!");
          setAllRecipes([...allRecipes, newRecipe]);
        })
        .catch((err) => {
          showNotificationAnt("error", err.errorText);
          console.log(err);
        });
    }
  };

  const handleUpdateRecipe = (id, recipe) => {
    if (isLoggedIn) {
      mainApi
        .updateRecipe(id, recipe)
        .then((newRecipe) => {
          showNotificationAnt("success", "Рецепт обновлен!");
          const updated = allRecipes.filter((r) => r._id !== id);
          setAllRecipes([...updated, newRecipe]);
        })
        .catch((err) => {
          showNotificationAnt("error", err.errorText);
          console.log(err);
        });
    }
  };

  const handleDeleteRecipe = (recipe) => {
    if (isLoggedIn) {
      mainApi
        .deleteRecipe(recipe._id)
        .then((res) => {
          const updatedAllRecipes = allRecipes.filter(
            (r) => r._id !== recipe._id
          );
          setAllRecipes(updatedAllRecipes);
        })
        .catch((err) => {
          showNotificationAnt("error", err.errorText);
          console.log(err);
        });
    }
  };

  const handleLikeRecipe = (recipe, isLiked) => {
    // console.log(recipe);
    if (isLoggedIn) {
      if (!isLiked) {
        mainApi.likeRecipe(recipe._id).then((newRecipe) => {
          setLikedRecipes([...likedRecipes, newRecipe]);
        });
      } else {
        handleDislikeRecipe(recipe);
      }
    } else {
      showNotificationAnt(
        "warning",
        "Войдите или зарегистрируйтесь, чтобы сохранять рецепты в избранное"
      );
    }
  };

  const handleDislikeRecipe = (recipe) => {
    mainApi.dislikeRecipe(recipe._id).then((res) => {
      const updatedLikedRecipes = likedRecipes.filter((r) => r._id !== res._id);
      setLikedRecipes(updatedLikedRecipes);
    });
  };

  return (
    <>
      {headerView && (
        <Header
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          isCurrentUser={user}
          // isAdmin={isAdminUser}
          onLogout={handleLogout}
          // isEmailUser={isEmailUser}
        />
      )}
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
          {/* <Route path="/shopping-list" element={<ShoppingList />} /> */}
          <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
      )}
      {footerView && <Footer />}
    </>
  );
}

export default App;
