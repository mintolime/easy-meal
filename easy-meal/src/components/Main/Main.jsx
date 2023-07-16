import Button from "../Button/Button";
import plate from "../../images/plate.png";
import rucola from "../../images/rucola-png.png";
import photo from "../../images/Photo.png";
import "./Main.css";

function Main() {
  return (
    <main className="main">
      <div className="main__content">
        <h1 className="main__title">Рецепты в один клик</h1>
        <Button btnClass={"button_type_start"} btnText="Начать" />
      </div>
      <div className="main__img-box">
        {/* <img className="main__photo-plate" src={plate} alt="блюдо с авокадо" />
        <img className="main__photo-rucola" src={rucola} alt="руккола" /> */}
        <img className="main__photo-plate" src={photo} alt="блюдо с авокадо" />
      </div>
    </main>
  );
}

export default Main;
