https://api.easymeal.click

PORT = 3003

**_POST_** **/signin** - логин (email, password)

**_POST_** **/signup** - регистрация (email, password)

**_GET_** **/users/me** - получить инфо о юзере. В принципе, особо не нужен

**_POST_** **/users/like/:recipeId** - лайкнуть рецепт и добавить его в массив likes

**_DELETE_** **/users/dislike/:recipeId** - дизлайкнуть рецепт и удалить его из массива likes

**_GET_** **/recipes** - получить все рецепты

**_POST_** **/recipes** - добавить новый рецепт.

**_DELETE_** **/recipes/:id** - удалить рецепт по его id, например delete https://api.easymeal.click/recipes/64bbca79eeec0c497684f005

```js
  // пример того, что ожидает получить бэк
{
    "mealName": "Apple & Blackberry Crumble",
    "mealAuthor" : "Eva Bright",
    "mealSourceUrl": "https://easy-meal.click",
    "mealCategory": "Dessert",
    "youtubeUrl": "https://www.youtube.com/watch?v=4vhcOwVBDO4",
    "imageUrl": "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
    "instructions": "Heat oven to 190C/170C fan/gas 5. Tip the flour and sugar into a large bowl. Add the butter, then rub into the flour using your fingertips to make a light breadcrumb texture. Do not overwork it or the crumble will become heavy. Sprinkle the mixture evenly over a baking sheet and bake for 15 mins or until lightly coloured.\r\nMeanwhile, for the compote, peel, core and cut the apples into 2cm dice. Put the butter and sugar in a medium saucepan and melt together over a medium heat. Cook for 3 mins until the mixture turns to a light caramel. Stir in the apples and cook for 3 mins. Add the blackberries and cinnamon, and cook for 3 mins more. Cover, remove from the heat, then leave for 2-3 mins to continue cooking in the warmth of the pan.\r\nTo serve, spoon the warm fruit into an ovenproof gratin dish, top with the crumble mix, then reheat in the oven for 5-10 mins. Serve with vanilla ice cream.",
    "ingredients": [
        {
            "ingredient": "Plain Flour",
            "measure": "120g"
        },
        {
            "ingredient": "Caster Sugar",
            "measure": "60g"
        }

    ]
}
```
