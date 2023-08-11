import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import "./Recipe.css";
import Button from "../Button/Button";
import heart from "../../images/icon__heart.svg";
import heartLiked from "../../images/icon__heart_liked.svg";
import dice from "../../images/dice_icon.svg";
import AddToCart from "../../images/cart.svg";

const Recipe = ({ recipe, likedRecipes, getRandomRecipe, onLikeRecipe }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isLiked = likedRecipes.some((r) => r._id === recipe._id);
  const cleanInstructions = DOMPurify.sanitize(recipe.instructions);

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
            <img
              className="recipe__icon-heart"
              src={isLiked ? heartLiked : heart}
              alt="heart icon"
              onClick={() => {
                onLikeRecipe(recipe, isLiked);
              }}
            />
          }
        />

        <Button
          btnText={
            <img className="recipe__icon-dice" src={dice} alt="dice icon" />
          }
          onClick={getRandomRecipe}
        />
      </div>

      <img
        className="recipe__image"
        src={recipe.imageLink || recipe.imageUrl}
        alt={recipe.mealName}
      />
      <div className="recipe__info recipe__box-shabow">
        <h1 className="recipe__meal-name">{recipe.mealName}</h1>
        {/* <p className="recipe__ingredients-quantity">
          {recipe.ingredients?.length} ингредиентов
        </p> */}

        <div className="recipe__buttons-container recipe__buttons-container_flex-column">
          {showInstructions ? (
            <Button
              btnClass={"recipe__button"}
              btnText={"Ингредиенты"}
              onClick={() => setShowInstructions((prev) => !prev)}
            />
          ) : (
            <Button
              btnClass={"recipe__button"}
              btnText={"Как готовить"}
              onClick={() => setShowInstructions((prev) => !prev)}
            />
          )}

          {(recipe.youtubeLink || recipe.youtubeUrl) && (
            <a
              className="recipe__button recipe__button-yt"
              href={recipe.youtubeLink || recipe.youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Видео
            </a>
          )}
          <div className="recipe__buttons-container recipe__buttons-container_flex-column ">
            <p className="recipe__author">{recipe.mealAuthor || "No Author"}</p>
            <a
              className="recipe__author-link"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Полный рецепт &#10132;
            </a>
          </div>
        </div>
      </div>

      {showInstructions ? (
        <p
          className="recipe__instructions recipe__box-shabow"
          dangerouslySetInnerHTML={{ __html: cleanInstructions }}
        />
      ) : (
        <ul className="recipe__ingredients ">
          {recipe.ingredients?.map((item, index) => {
            return (
              <li
                className="recipe__ingreditent-container recipe__box-shabow"
                key={index}
              >
                <div className="recipe__ingreditent">
                  <p className="recipe__ingreditent-name">{item.ingredient}</p>
                  <p className="recipe__ingreditent-measure">{item.measure}</p>
                </div>

                {/* <Button
                  btnClass="button_type-addtocart"
                  btnText={
                    <img
                      className="recipe__icon-addtocart"
                      src={AddToCart}
                      alt="add to cart icon"
                    />
                  }
                /> */}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Recipe;
