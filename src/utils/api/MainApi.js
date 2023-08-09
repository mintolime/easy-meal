import { handleResponce } from "../functions";

export class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getSavedRecipes() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => handleResponce(res));
  }

  getRecipes() {
    return fetch(`${this._url}/recipes`, {
      headers: this._headers,
    }).then((res) => handleResponce(res));
  }

  createRecipe(recipe) {
    return fetch(`${this._url}/recipes`, {
      method: "POST",
      body: JSON.stringify({
        mealName: recipe.mealName,
        mealAuthor: recipe.mealAuthor,
        mealCategory: recipe.mealCategory,
        instructions: recipe.instructions,
        mealSourceUrl: recipe.mealSourceUrl,
        imageUrl: recipe.imageUrl,
        youtubeUrl: recipe.youtubeUrl,
        ingredients: recipe.ingredients,
      }),
      headers: this._headers,
    }).then((res) => handleResponce(res));
  }

  likeRecipe(id) {
    return fetch(`${this._url}/users/like/${id}`, {
      method: "POST",
      headers: this._headers,
    }).then((res) => handleResponce(res));
  }

  dislikeRecipe(id) {
    return fetch(`${this._url}/users/dislike/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => handleResponce(res));
  }
}
