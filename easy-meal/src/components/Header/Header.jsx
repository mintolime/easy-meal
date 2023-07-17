import './Header.css';
import logo from '../../images/header-logo.svg';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to={'/'}>
        <img className="header__logo" src={logo} alt="логотип шапки сайта" />
      </Link>
      <Button btnClass={'button_type_menu-open'} />
    </header>
  );
}

export default Header;
