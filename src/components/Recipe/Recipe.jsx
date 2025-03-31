import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';

import './Recipe.css';
import Button from '../Button/Button';
import heart from '../../images/icon__heart.svg';
import heartLiked from '../../images/icon__heart_liked.svg';
import question from '../../images/question-help.svg';
import dice from '../../images/dice_icon.svg';
import AddToCart from '../../images/cart.svg';

const Recipe = ({ recipe, likedRecipes, getRandomRecipe, onLikeRecipe }) => {
  const [isDiceRotating, setIsDiceRotating] = useState(false);
  const [isHeartScaling, setIsHeartScaling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);

  const toggleShowMore = () => {
    setShowMoreIngredients(!showMoreIngredients);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const isLiked = likedRecipes.some((r) => r._id === recipe._id);
  const cleanInstructions = DOMPurify.sanitize(recipe.instructions);

  const showInfo = () => {
    Modal.info({
      title: 'Помощь',
      content: (
        <div style={{ fontFamily: 'Cruinn' }}>
          <p>
            Данный ресурс служит для быстрого решения вашей ежедневной головоломки: Что же
            приготовить на ужин?😱
          </p>
          <p>
            В нашем приложении вы можете увидеть сокращенную версию рецептов. Для перехода к
            источнику нажмите на "Полный рецепт"
          </p>
          <p>Для генерации рецепта нажмите кубик 🎲</p>
          <p>Чтобы добавить понравившийся рецепт, нажмите на сердечко 🧡 </p>
          <p>Приятного пользования!</p>
        </div>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDiceClick = () => {
    setIsDiceRotating(true);
    setShowMoreIngredients(false);
    setShowInstructions(false);

    getRandomRecipe();
  };

  const handleHeartClick = () => {
    setIsHeartScaling(true);
    onLikeRecipe(recipe, isLiked);
  };

  return (
    <section className="recipe">
      <div className="recipe__buttons-container">
        <motion.div
          animate={{ scale: isHeartScaling ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setIsHeartScaling(false)}>
          <Button
            btnClass="recipe__heart-btn"
            btnText={
              <img
                className="recipe__icon-heart"
                src={isLiked ? heartLiked : heart}
                alt="heart icon"
                onClick={handleHeartClick}
              />
            }
          />
        </motion.div>

        <Button
          btnClass="recipe__question"
          btnText={<img className="recipe__icon-question" src={question} alt="question icon" />}
          onClick={showInfo}
        />

        <motion.div
          animate={{ rotate: isDiceRotating ? 360 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={() => setIsDiceRotating(false)}>
          <Button
            btnClass="recipe__dice-btn"
            btnText={<img className="recipe__icon-dice" src={dice} alt="dice icon" />}
            onClick={handleDiceClick}
          />
        </motion.div>
      </div>

      <img className="recipe__image" loading="lazy" src={recipe.imageUrl} alt={recipe.mealName} />
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
          <div className="recipe__buttons-container recipe__buttons-container_flex-column ">
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

      <AnimatePresence mode="wait">
        {showInstructions ? (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <p
              className="recipe__instructions recipe__box-shabow"
              dangerouslySetInnerHTML={{ __html: cleanInstructions }}
            />
          </motion.div>
        ) : (
          <motion.ul
            className="recipe__ingredients"
            key="ingredients"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {recipe.ingredients
              ?.slice(0, showMoreIngredients ? recipe.ingredients.length : 6)
              .map((item, index) => (
                <motion.li
                  className="recipe__ingreditent-container recipe__box-shabow"
                  key={index}
                  variants={itemVariants}>
                  <div className="recipe__ingreditent">
                    <p className="recipe__ingreditent-name">{item.ingredient}</p>
                    <p className="recipe__ingreditent-measure">{item.measure}</p>
                  </div>
                </motion.li>
              ))}
            {recipe.ingredients?.length > 6 && (
              <motion.div variants={itemVariants}>
                <Button
                  btnClass="recipe__button"
                  onClick={toggleShowMore}
                  btnText={showMoreIngredients ? 'Скрыть ▲' : 'Еще ▼'}
                />
              </motion.div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Recipe;
