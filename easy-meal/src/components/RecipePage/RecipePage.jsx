/* eslint-disable react/prop-types */

const RecipePage = ({ recipe }) => {
  console.log(recipe.mealName);
  return (
    <div>
      <h2>{recipe.mealName}</h2>
    </div>
  );
};

export default RecipePage;
