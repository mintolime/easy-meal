// проверка роутеров
export const checkPath = (el, location) => el.includes(location.pathname);

// for API
export const handleResponce = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.text().then((text) => {
        return Promise.reject({
            status: res.status,
            errorText: JSON.parse(text).message,
        });
    });
};

// const getRandomRecipe = () => {
//   const index = Math.floor(Math.random() * (allRecipes.length - 1));
//   const randomRecipe = allRecipes[index];
//   // const modifiedRecipe = modifyRecipeObject(randomRecipe);

//   setRecipe(randomRecipe);
// };

// const getRandomRecipe = () => {
//   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
//     .then((data) => data.json())
//     .then((randRecipe) => {
//       console.log(randRecipe);
//       const newRecipe = modifyRecipeObject(randRecipe.meals[0]);
//       setRecipe(newRecipe);

//       if (location.pathname !== '/recipe') {
//         navigate('/recipe');
//       }
//     });
// };

export const modifyRecipeObject = (value) => {
    let ingredients = [];

    for (let i = 1; i <= 30; i++) {
        let ingredient = value[`strIngredient${i}`];
        let measure = value[`strMeasure${i}`];

        if (ingredient !== '' && measure !== '') {
            ingredients.push({ ingredient, measure });
        } else {
            break;
        }
    }

    const newRecipe = {
        mealName: value.strMeal,
        mealId: value.idMeal,
        mealCategory: value.strCategory,
        youtubeLink: value.strYoutube,
        imageLink: value.strMealThumb,
        instructions: value.strInstructions,
        ingredients,
    };

    return newRecipe;
};
