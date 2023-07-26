/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Recipe from "./components/Recipe/Recipe";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";
import NotFound from "./components/NotFound/NotFound";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import { API_BACKEND, footerRoutes, headerRoutes } from "./utils/config";
import { checkPath } from "./utils/functions";
import { Auth } from "./utils/api/AuthApi";
import { initialRecipe } from "./utils/constants";
import Loader from "./components/Loader/Loader";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // проверка для отображения
  const headerView = checkPath(headerRoutes, location);
  const footerView = checkPath(footerRoutes, location);

  const [recipe, setRecipe] = useState(initialRecipe.meals[0]);

  // Временный тоггл стейта isLoggedIn
  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const getRandomRecipe = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((data) => data.json())
      .then((randRecipe) => {
        const newRecipe = modifyRecipeObject(randRecipe.meals[0]);
        setRecipe(newRecipe);

        if (location.pathname !== "/recipe") {
          navigate("/recipe");
        }
      });
  };

  // useEffect(() => {
  //   getRandomRecipe();
  // }, []);

  const modifyRecipeObject = (value) => {
    let ingredients = [];

    for (let i = 1; i <= 30; i++) {
      let ingredient = value[`strIngredient${i}`];
      let measure = value[`strMeasure${i}`];

      if (ingredient !== "" && measure !== "") {
        ingredients.push({ ingredient, measure });
      } else {
        break;
      }
    }

    const newRecipe = {
      mealName: value.strMeal,
      mealId: value.idMeal,
      youtubeLink: value.strYoutube,
      imageLink: value.strMealThumb,
      instructions: value.strInstructions,
      ingredients,
    };

    return newRecipe;
  };

  useEffect(() => {
    setRecipe(modifyRecipeObject(recipe));
  }, []);

  const getRecipeTemp = () => {
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
  // проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    //обертка функция
    const delayedCheckToken = () => {
      apiAuth
        .checkToken(jwt)
        .then(() => {
          setIsLoggedIn(true);
          setIsLoading(false);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          if (err.status === 401) {
            setIsLoading(false);
            localStorage.removeItem("jwt");
            navigate("/signin", { replace: true });
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
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
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
        localStorage.setItem("jwt", data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(
          `Что-то пошло не так: ошибка запроса статус ${err.status}, сообщение ${err.errorText} 😔`
        );
        setIsLoggedIn(false);
        // setIsRegistration(false);
        // handleRegistrationSuccess();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
    setIsLoggedIn(false);
  };

  return (
    <>
      {headerView && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Main getRecipe={getRecipeTemp} />} />
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
              <Recipe recipe={recipe} getRandomRecipe={getRandomRecipe} />
            }
          />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {footerView && <Footer />}
      <div className="temp-login">
        <label htmlFor="login">isLoggedIn</label>
        <input id="login" type="checkbox" onClick={toggleLoggedIn} />
      </div>
    </>
  );
}

export default App;
