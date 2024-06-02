import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import DOMPurify from 'dompurify';

import './Recipe.css';
import Button from '../Button/Button';
import heart from '../../images/icon__heart.svg';
import heartLiked from '../../images/icon__heart_liked.svg';
import question from '../../images/question-help.svg';
import dice from '../../images/dice_icon.svg';
import AddToCart from '../../images/cart.svg';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe, likedRecipes, getRandomRecipe, onLikeRecipe }) => {
  const [rotateDice, setRotateDice] = useState(false);
  const [scaleHeart, setScaleHeart] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const isLiked = likedRecipes.some((r) => r._id === recipe._id);
  const cleanInstructions = DOMPurify.sanitize(recipe.instructions);

  const showInfo = () => {
    Modal.info({
      title: 'Помощь',
      content: (
        <div style={{ fontFamily: 'Cruinn' }}>
          <p>
            Данный ресурс служит для быстрого решения вашей ежедневной головоломки: Что же
            приготовить на ужин? 😱
          </p>
          <p>
            В нашем приложении вы можете увидеть сокращенную версию рецептов. Для перехода к
            источнику нажмите на "Полный рецепт"
          </p>
          <p>Для генерации рецепта нажмите кубик 🎲</p>
          <p>Чтобы добавить понравившийся рецепт, нажмите на сердечко 🧡</p>
          <p>Приятного пользования!</p>
        </div>
      ),
      onOk() {},
    });
  };

  // Почему-то при переходе с главной страницы на рецепты попадаешь в конец,
  // поэтому добавил принудильный скролл наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const animateButton = (btn) => {
    if (btn === 'heart') {
      setScaleHeart(true);
    } else if (btn === 'dice') {
      setRotateDice(true);
    }

    setTimeout(() => {
      setScaleHeart(false);
      setRotateDice(false);
    }, 600);
  };
  
  return (
    <section className="recipe">
      {recipe.length > 1 ? (
        <>
          <div className="recipe__buttons-container">
            <Button
              btnClass={`recipe__heart-btn ${isLiked && scaleHeart ? 'scale' : ''}`}
              btnText={
                <img
                  className="recipe__icon-heart"
                  src={isLiked ? heartLiked : heart}
                  alt="heart icon"
                  onClick={() => {
                    animateButton('heart');
                    onLikeRecipe(recipe, isLiked);
                  }}
                />
              }
            />

            <Button
              btnClass="recipe__question"
              btnText={<img className="recipe__icon-question" src={question} alt="question icon" />}
              onClick={showInfo}
            />

            <Button
              btnClass={`recipe__dice-btn ${rotateDice ? 'rotate' : ''}`}
              btnText={<img className="recipe__icon-dice" src={dice} alt="dice icon" />}
              onClick={() => {
                animateButton('dice');
                getRandomRecipe();
              }}
            />
          </div>
          <img
            className="recipe__image"
            loading="lazy"
            src={recipe.imageUrl}
            alt={recipe.mealName}
          />
          <div className="recipe__info recipe__box-shabow">
            <h1 className="recipe__meal-name">{recipe.mealName}</h1>

            <div className="recipe__buttons-container recipe__buttons-container_flex-column">
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

              {recipe.youtubeUrl && (
                <a
                  className="recipe__button recipe__button-yt"
                  href={recipe.youtubeUrl}
                  target="_blank"
                  rel="noreferrer">
                  Видео
                </a>
              )}
              <div className="recipe__buttons-container recipe__buttons-container_flex-column">
                <p className="recipe__author">{recipe.mealAuthor || 'No Author'}</p>
                <a
                  className="recipe__author-link"
                  href={recipe.mealSourceUrl}
                  target="_blank"
                  rel="noreferrer">
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
            <ul className="recipe__ingredients">
              {recipe.ingredients?.map((item, index) => (
                <li className="recipe__ingreditent-container recipe__box-shabow" key={index}>
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
              ))}
            </ul>
          )}
        </>
      ) : (
        <div>
          <p className="recipe__not-found">
            Рецепты не найдены... На сегодня готовка отменяется, вы можете заказать себе любимых
            крылешек 🍗
          </p>
          <Link className=" link-null button_type_back" to="/">
            На главную
          </Link>
        </div>
      )}
    </section>
  );
};

export default Recipe;
