https://api.easymeal.click

PORT = 3003

**_POST_** **/signin** - логин (email, password)

**_POST_** **/signup** - регистрация (email, password)

**_GET_** **/users/me** - получить инфо о юзере. В принципе, особо не нужен

**_GET_** **/recipes** - получить все сохраненные рецепты авторизованного юзера

**_POST_** **/recipes** - сохранить новый рецепт.

```js
  // пример того, что ожидает получить бэк
  mealName: 'Apple & Blackberry Crumble',
  mealId: '52893',
  youtubeLink: 'https://www.youtube.com/watch?v=4vhcOwVBDO4',
  imageLink:
    'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
  instructions:
    'Heat oven to 190C/170C fan/gas 5. Tip the flour and sugar into a large bowl.' ,
  ingredients: [
    {
      ingredient: 'Plain Flour',
      measure: '120g',
    },
    {
      ingredient: 'Caster Sugar',
      measure: '60g',
    },
  ],
```

Логика такая: если в БД еще нет этого рецепта, то создай новый и добавь текущего юзера в массив owner. Если рецепт уже существует, то обнови массив owner, добавив туда нового юзера. Если у юзера уже есть этот рецепт в сохраненных, тогда выполни запрос на DELETE, см ниже

**DELETE /recipes/:id** - удалить рецепт по его id, например delete https://api.easymeal.click/recipes/64bbca79eeec0c497684f005
