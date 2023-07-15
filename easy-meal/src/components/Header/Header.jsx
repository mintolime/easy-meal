import './Header.css';

function Header() {
    return (
        <header className='header'>
          <img className="header__logo" src={logo} alt="логотип шапки сайта" />
        </header>
    )
}

export default Header;