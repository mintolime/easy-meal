import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    return (
        <section className="page_404">
            <div className="page_404__container page_404__four_zero_four_bg ">
                <div className="page_404__contant_box_404">
                    <h2 className="page_404__heading">404</h2>
                    <p className="page_404__description">Упс..страница не найдена!</p>
                    <Link
                        className="page_404__link_404"
                        onClick={() => {
                            isLoggedIn ? navigate(-1) : navigate(-2);
                        }}
                    >
                        Назад
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
