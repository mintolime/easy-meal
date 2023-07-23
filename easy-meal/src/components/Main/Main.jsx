/* eslint-disable react/prop-types */

import Button from '../Button/Button';
import plate from "../../images/plate.png";
import './Main.css';

function Main({ getRecipe }) {
  return (
    <main className="main">
      <div className="main__content">
        <h1 className="main__title">Рецепты в один клик</h1>
        <Button
          btnClass={'button_type_start'}
          btnText="Начать"
          onClick={getRecipe}
        />
      </div>

      <div className="main__img-box">
        <img className="main__photo-plate" src={plate} alt="блюдо с авокадо" />
      </div>
    </main>
  );
}

export default Main;