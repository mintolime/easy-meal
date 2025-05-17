import { Modal, Tooltip } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import dice from '../../images/dice_icon.svg';
import heart from '../../images/icon__heart.svg';
import heartLiked from '../../images/icon__heart_liked.svg';
import Button from '../Button/Button';
import './Recipe.scss';

const Recipe = ({ recipe, isLoading, likedRecipes, getRandomRecipe, onLikeRecipe }) => {
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

    const pulse = {
        rest: { scale: 1 },
        hover: { scale: 1.1, transition: { duration: 0.3 } },
        tap: { scale: 0.9, transition: { duration: 0.1 } },
        animate: {
            scale: [1.25, 1.1, 1.25, 1.1],
            transition: {
                duration: 1.25,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
            },
        },
    };

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
            {recipe.length === 0 && !isLoading ? (
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
                        <div className="recipe__btn-inner">
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
                            <span>В самое сердечко</span>
                        </div>

                        <motion.button
                            className="recipe__question"
                            onClick={showInfo}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            animate="animate"
                        >
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="48"
                                viewBox="0 -960 960 960"
                                width="48"
                                className="recipe__icon-question"
                                variants={pulse}
                            >
                                <path d="M484-247q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm-35-146h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
                            </motion.svg>
                        </motion.button>

                        <div className="recipe__btn-inner">
                            <motion.div
                                animate={{ rotate: isDiceRotating ? 360 : 0 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                onAnimationComplete={() => setIsDiceRotating(false)}
                            >
                                <Button
                                    btnClass="recipe__dice-btn"
                                    btnText={
                                        <Tooltip
                                            title="Получить новый рецепт"
                                            color="rgb(161, 119, 228)"
                                            className="recipe__tooltip"
                                        >
                                            <img className="recipe__icon-dice" src={dice} alt="dice icon" />
                                        </Tooltip>
                                    }
                                    onClick={handleDiceClick}
                                />
                            </motion.div>
                            <span>Ещё рецепт</span>
                        </div>
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
