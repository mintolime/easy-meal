/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Header.css';
import logo from '../../images/header-logo.svg';
import Button from '../Button/Button';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <header className="header">
      <Link to={'/'}>
        <img className="header__logo" src={logo} alt="логотип шапки сайта" />
      </Link>

      <div className="header__nav_desktop">
        {!isLoggedIn && (
          <nav className="header__nav header__nav-unauthorized">
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__link" to="/signin">
              Войти
            </Link>
          </nav>
        )}

        {isLoggedIn && (
          <nav className="header__nav header__nav-authorized">
            <Link className="header__link" to="/saved-recipes">
              Избранное
            </Link>
            <Link className="header__link" to="/shopping-list">
              Список покупок
            </Link>
            <Button btnClass={'button_type_signout'} btnText={'Выйти'} />
          </nav>
        )}
      </div>

      <div className="header__nav_tablet">
        <Button btnClass={'button_type_menu-open'} onClick={showDrawer} />

        <Drawer title="Меню" placement="right" onClose={onClose} open={open}>
          {!isLoggedIn && (
            <nav className="header__nav header__nav-unauthorized">
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            </nav>
          )}

          {isLoggedIn && (
            <nav className="header__nav header__nav-authorized">
              <Link className="header__link" to="/saved-recipes">
                Избранное
              </Link>
              <Link className="header__link" to="/shopping-list">
                Список покупок
              </Link>
              <Button btnClass={'button_type_signout'} btnText={'Выйти'} />
            </nav>
          )}
        </Drawer>
      </div>
    </header>
  );
}

export default Header;