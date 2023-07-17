import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className="page_404">
      <div className="page_404__container page_404__four_zero_four_bg ">
        <div className="page_404__contant_box_404">
          <h2 className="page_404__heading">404</h2>
          <p className="page_404__description">
            Упс..страница не найдена!
          </p>
          <Link to={'/'} className="page_404__link_404">
            Назад
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
