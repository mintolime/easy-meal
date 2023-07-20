/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import './Recipe.css';
import Button from '../Button/Button';
import heart from '../../images/heart_icon.svg';
import dice from '../../images/dice_icon.svg';
import AddToCart from '../../images/cart.svg';

const Recipe = ({ recipe, getRandomRecipe }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  // Почему-то при переходе с главной страницы на рецепты попадаешь в конец,
  // поэтому добавил принудильный скролл наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="recipe">
      <div className="recipe__buttons-container">
        <Button
          btnText={
            <img className="recipe__icon-dice" src={dice} alt="dice icon" />
          }
          onClick={getRandomRecipe}
        />
        <Button
          btnText={
            <img className="recipe__icon-heart" src={heart} alt="heart icon" />
          }
        />
      </div>

      <img
        className="recipe__image"
        src={recipe.imageLink}
        alt={recipe.mealName}
      />
      <div className="recipe__info recipe__box-shabow">
        <h1 className="recipe__meal-name">{recipe.mealName}</h1>
        <p className="recipe__ingredients-quantity">
          {recipe.ingredients?.length} ингредиентов
        </p>

        <div className="recipe__buttons-container">
          {showInstructions ? (
            <Button
              btnClass={'recipe__button'}
              btnText={'Ингредиенты'}
              onClick={() => setShowInstructions((prev) => !prev)}
            />
          ) : (
            <Button
              btnClass={'recipe__button'}
              btnText={'Как готовить'}
              onClick={() => setShowInstructions((prev) => !prev)}
            />
          )}
          <a
            className="recipe__button-yt"
            href={recipe.youtubeLink}
            target="_blank"
            rel="noreferrer"
          >
            Видео
          </a>
        </div>
      </div>

      {showInstructions ? (
        <p className="recipe__instructions recipe__box-shabow">{recipe.instructions}</p>
      ) : (
        <ul className="recipe__ingredients ">
          {recipe.ingredients?.map((item, index) => {
            return (
              <li className="recipe__ingreditent-container recipe__box-shabow" key={index}>
                <div className="recipe__ingreditent">
                  <p className="recipe__ingreditent-name">{item.ingredient}</p>
                  <p className="recipe__ingreditent-measure">{item.measure}</p>
                </div>

                <Button
                  btnClass="button_type-addtocart"
                  btnText={
                    <img
                      className="recipe__icon-addtocart"
                      src={AddToCart}
                      alt="add to cart icon"
                    />
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Recipe;
