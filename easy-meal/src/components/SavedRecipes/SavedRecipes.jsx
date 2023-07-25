/* eslint-disable react/prop-types */
import './SavedRecipes.css';

const SavedRecipes = ({ likedRecipes }) => {
  // console.log(likedRecipes);

  return (
    <div className="saved-recipes">
      <ul>
        {likedRecipes.map((recipe) => {
          return <li key={recipe._id}>{recipe.mealName}</li>;
        })}
      </ul>
    </div>
  );
};

export default SavedRecipes;
