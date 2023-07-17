/* eslint-disable react/prop-types */

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe ? recipe.mealName : 'no recipes, come back later'}</h2>
    </div>
  );
};

export default Recipe;
