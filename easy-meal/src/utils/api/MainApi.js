import { handleResponce } from '../functions';

export class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getSavedRecipes() {
    return fetch(`${this._url}/recipes`, {
      headers: this._headers
    }).then((res) => handleResponce(res));
  }

  saveRecipe(recipe) {
    return fetch(`${this._url}/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        mealId: recipe.mealId,
        mealName: recipe.mealName,
        mealCategory: recipe.mealCategory,
        instructions: recipe.instructions,
        imageLink: recipe.imageLink,
        youtubeLink: recipe.youtubeLink,
        ingredients: recipe.ingredients
      }),
      headers: this._headers
    }).then((res) => handleResponce(res));
  }

  deleteRecipe(id) {
    return fetch(`${this._url}/recipes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => handleResponce(res));
  }
}
