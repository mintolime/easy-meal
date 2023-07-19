import { useState } from 'react';
import './Header.css';
import logo from '../../images/header-logo.svg';
import Button from '../Button/Button';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';

function Header() {
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
      <Button btnClass={'button_type_menu-open'} onClick={showDrawer} />

      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </header>
  );
}

export default Header;
