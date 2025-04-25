import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from '../AdminPanel/AdminPanel';
import Login from '../Login/Login';
import { MainPageAsync } from '../Main/Main.async';
import NotFound from '../NotFound/NotFound';
import { RecipePageAsync } from '../Recipe/Recipe.async';
import RecipesList from '../RecipesList/RecipesList';
import Register from '../Register/Register';
import Loader from '../Loader/Loader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const AppRoutes = ({
    isLoggedIn,
    user,
    recipe,
    NewRecipe,
    likedRecipes,
    allRecipes,
    handleSetRecipe,
    handleCreateRecipe,
    handleUpdateRecipe,
    handleDeleteRecipe,
    handleLikeRecipe,
    handleDislikeRecipe,
    handleAuthorization,
    handleRegistration,
    getRecipe,
    getRandomRecipe,
}) => {
    return (
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
                {/* <Route path="/shopping-list" element={<ShoppingList />} /> */}
                <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
            </Routes>
        </Suspense>
    );
};

export default React.memo(AppRoutes);
