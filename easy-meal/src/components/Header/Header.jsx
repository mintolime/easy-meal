import './Header.css';
import logo from '../../images/header-logo.svg'
import Button from '../Button/Button';
function Header() {
    return (
        <header className='header'>
          <img className="header__logo" src={logo} alt="логотип шапки сайта" />
          <Button btnClass={'button_type_menu-open'} />
        </header>
    )
}

export default Header;