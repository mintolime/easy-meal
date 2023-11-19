import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import plate from '../../images/plate.jpg';
import './Main.css';

function Main({ getRecipe }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 250); // Здесь можно указать нужную задержку времени в миллисекундах
  }, []);

  return (
    <main className="main">
      <div className={`main__content ${isVisible ? 'main__content_visible' : ''}`}>
          <>
            <h1 className="main__title">Что приготовить?</h1>
            <p className="main__subtitle">
              Добро пожаловать на наш сайт случайного поиска блюд! Функция
              случайного поиска поможет вам открыть для себя новые и интересные
              блюда, которые вы можете приготовить дома или заказать в ресторане.
              Просто нажмите кнопку "Начать" и наслаждайтесь удивительными
              результатами!
            </p>
            <Button
          btnClass={'button_type_start'}
          btnText="Начать"
          onClick={getRecipe}
        />
            </>
      </div>

      <div className="main__img-box">
       <img className="main__photo-plate" src={plate} alt="блюдо с авокадо" />
      </div>
    </main>
  );
}

export default Main;