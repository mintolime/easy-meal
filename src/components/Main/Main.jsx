import { motion } from 'framer-motion';
import React from 'react';
import plate from '../../images/plate.jpg';
import Button from '../Button/Button';
import './Main.css';

function Main({ getRecipe }) {
    // Анимация для контента
    const contentVariants = {
        hidden: { opacity: 0, x: -800 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3,
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    // Анимация для изображения
    const imageVariants = {
        hidden: { opacity: 0, x: 200 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.6,
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    // Анимация для кнопки
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                yoyo: Infinity,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    return (
        <main className="main">
            <motion.div className="main__content" initial="hidden" animate="visible" variants={contentVariants}>
                <h1 className="main__title">Что приготовить?</h1>
                <p className="main__subtitle">
                    Добро пожаловать на наш сайт случайного поиска блюд! Функция случайного поиска поможет вам открыть
                    для себя новые и интересные блюда, которые вы можете приготовить дома или заказать в ресторане.
                    Просто нажмите кнопку "Начать" и наслаждайтесь удивительными результатами!
                </p>

                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button btnClass={'button_type_start'} btnText="Начать" onClick={getRecipe} />
                </motion.div>
            </motion.div>

            <motion.div className="main__img-box" initial="hidden" animate="visible" variants={imageVariants}>
                <img className="main__photo-plate" src={plate} alt="блюдо с авокадо" />
            </motion.div>
        </main>
    );
}

export default Main;
