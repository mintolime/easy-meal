/* eslint-disable react/prop-types */
import Button from '../Button/Button';
import './SavedRecipes.css';

const SavedRecipes = ({ likedRecipes, deleteRecipe }) => {
  // console.log(likedRecipes);

  return (
    <div className="saved-recipes">
      <ul>
        {likedRecipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <h4>{recipe.mealName}</h4>
              <Button
                btnText={'Delete'}
                onClick={() => deleteRecipe(recipe._id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedRecipes;
