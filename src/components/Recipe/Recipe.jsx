import { Modal, Tooltip } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import dice from '../../images/dice_icon.svg';
import heart from '../../images/icon__heart.svg';
import heartLiked from '../../images/icon__heart_liked.svg';
import question from '../../images/question-help.svg';
import Button from '../Button/Button';
import './Recipe.scss';

const Recipe = ({ recipe, likedRecipes, getRandomRecipe, onLikeRecipe }) => {
    const [isDiceRotating, setIsDiceRotating] = useState(false);
    const [isHeartScaling, setIsHeartScaling] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showMoreIngredients, setShowMoreIngredients] = useState(false);

    // Конфигурация Quill редактора
    const modules = {
        toolbar: false, // Отключаем панель инструментов (только просмотр)
        clipboard: {
            matchVisual: false,
        },
    };

    const toggleShowMore = () => {
        setShowMoreIngredients(!showMoreIngredients);
    };

    // const itemVariants = {
    //   hidden: { y: 20, opacity: 0 },
    //   visible: {
    //     y: 0,
    //     opacity: 1,
    //     transition: {
    //       duration: 0.5,
    //       ease: 'easeOut',
    //     },
    //   },
    // };

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const isLiked = likedRecipes.some((r) => r._id === recipe._id);

    const showInfo = () => {
        Modal.info({
            title: 'Помощь',
            content: (
                <div style={{ fontFamily: 'Cruinn' }}>
                    <p>
                        Данный ресурс служит для быстрого решения вашей ежедневной головоломки: Что же приготовить на
                        ужин?😱
                    </p>
                    <p>
                        В нашем приложении вы можете увидеть сокращенную версию рецептов. Для перехода к источнику
                        нажмите на &ldquo;Полный рецепт&ldquo;
                    </p>
                    <p>Для генерации рецепта нажмите кубик 🎲</p>
                    <p>Чтобы добавить понравившийся рецепт, нажмите на сердечко 🧡</p>
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
            {recipe.length === 0 ? (
                <div className="recipe__not-found-container">
                    <p className="recipe__not-found">
                        Рецепты не найдены... На сегодня готовка отменяется, вы можете заказать себе любимых крылышек 🍗
                    </p>
                    <Link className="link-null button_type_back" to="/">
                        На главную
                    </Link>
                </div>
            ) : (
                <div className="recipe__box">
                    <div className="recipe__buttons-container">
                        <motion.div
                            animate={{ scale: isHeartScaling ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.6 }}
                            onAnimationComplete={() => setIsHeartScaling(false)}
                        >
                            <Button
                                btnClass="recipe__heart-btn"
                                btnText={
                                    <Tooltip title="Добавить в избранное" color="rgb(161, 119, 228)">
                                        <img
                                            className="recipe__icon-heart"
                                            src={isLiked ? heartLiked : heart}
                                            alt="heart icon"
                                            onClick={handleHeartClick}
                                        />
                                    </Tooltip>
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
                            onAnimationComplete={() => setIsDiceRotating(false)}
                        >
                            <Button
                                btnClass="recipe__dice-btn"
                                btnText={
                                    <Tooltip title="Получить новый рецепт" color="rgb(161, 119, 228)">
                                        <img className="recipe__icon-dice" src={dice} alt="dice icon" />
                                    </Tooltip>
                                }
                                onClick={handleDiceClick}
                            />
                        </motion.div>
                    </div>

                    <motion.div variants={imageVariants}>
                        <img className="recipe__image" loading="lazy" src={recipe.imageUrl} alt={recipe.mealName} />
                    </motion.div>
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
                                    rel="noreferrer"
                                >
                                    Видео
                                </a>
                            )}
                            <div className="recipe__buttons-container recipe__buttons-container_flex-column ">
                                <p className="recipe__author">Автор: {recipe.mealAuthor || 'Автор неизвестен'}</p>
                                <a
                                    className="recipe__author-link"
                                    href={recipe.mealSourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Полный рецепт &#10132;
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* {showInstructions ? (
          <p
            className="recipe__instructions recipe__box-shabow"
            dangerouslySetInnerHTML={{ __html: cleanInstructions }}
          />
        ) : (
          <ul className="recipe__ingredients">
            {recipe.ingredients
              ?.slice(0, showMoreIngredients ? recipe.ingredients.length : 6)
              .map((item, index) => (
                <li className="recipe__ingreditent-container recipe__box-shabow" key={index}>
                  <div className="recipe__ingreditent">
                    <p className="recipe__ingreditent-name">{item.ingredient}</p>
                    <p className="recipe__ingreditent-measure">{item.measure}</p>
                  </div>
                </li>
              ))}
            {recipe.ingredients?.length > 6 && (
              <Button
                btnClass="recipe__button"
                onClick={toggleShowMore}
                btnText={showMoreIngredients ? 'Скрыть ▲' : 'Еще ▼'}
              />
            )}
          </ul>
        )}
      </div> */}

                    <AnimatePresence mode="wait">
                        {showInstructions ? (
                            <motion.div
                                key="instructions"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="recipe__instructions recipe__box-shabow"
                            >
                                <ReactQuill
                                    value={recipe.instructions}
                                    readOnly={true}
                                    modules={modules}
                                    theme="snow"
                                    className="ql-editor"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="ingredients"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="recipe__instructions_box"
                            >
                                <ul className="recipe__ingredients">
                                    {recipe.ingredients
                                        ?.slice(0, showMoreIngredients ? recipe.ingredients.length : 6)
                                        .map((item, index) => (
                                            <motion.li
                                                className="recipe__ingreditent-container recipe__box-shabow"
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.05,
                                                }}
                                            >
                                                <div className="recipe__ingreditent-box">
                                                    <p className="recipe__ingreditent-name">{item.ingredient}</p>
                                                    <p className="recipe__ingreditent-measure">{item.measure}</p>
                                                </div>
                                            </motion.li>
                                        ))}
                                    {recipe.ingredients?.length > 6 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Button
                                                btnClass="recipe__button"
                                                onClick={toggleShowMore}
                                                btnText={showMoreIngredients ? 'Скрыть ▲' : 'Еще ▼'}
                                            />
                                        </motion.div>
                                    )}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
};

export default Recipe;
