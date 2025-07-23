// store.js
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Состояние пользователя
  user: {
    email: '',
    isAdmin: false,
  },
  // Состояние рецептов
  recipes: {
    allRecipes: [],
    currentRecipe: null,
    likedRecipes: [],
  },
  // Состояние загрузки
  isLoading: true,
  isLoggedIn: false,

  // Actions (методы для изменения состояния)
  login: (userData) => set({ 
    user: { 
      email: userData.email, 
      isAdmin: userData.isAdmin 
    },
    isLoggedIn: true 
  }),
  
  logout: () => set({ 
    user: { email: '', isAdmin: false }, 
    isLoggedIn: false 
  }),

  setAllRecipes: (recipes) => set({ 
    recipes: { ...useAppStore.getState().recipes, allRecipes: recipes } 
  }),

  setCurrentRecipe: (recipe) => set({ 
    recipes: { ...useAppStore.getState().recipes, currentRecipe: recipe } 
  }),

  addLikedRecipe: (recipe) => set({ 
    recipes: { 
      ...useAppStore.getState().recipes, 
      likedRecipes: [...useAppStore.getState().recipes.likedRecipes, recipe] 
    } 
  }),

  removeLikedRecipe: (recipeId) => set({ 
    recipes: { 
      ...useAppStore.getState().recipes, 
      likedRecipes: useAppStore.getState().recipes.likedRecipes.filter(r => r._id !== recipeId) 
    } 
  }),

  setLoading: (loading) => set({ isLoading: loading }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
}));