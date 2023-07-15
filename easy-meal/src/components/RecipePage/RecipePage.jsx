/* eslint-disable react/prop-types */

const RecipePage = ({ recipe }) => {
  console.log(recipe.strMeal);
  return (
    <div>
      <h2>{recipe.strMeal}</h2>
    </div>
  );
};

export default RecipePage;
