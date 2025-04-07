// import React from 'react';

import './Login.css';
import { Form, Input } from 'antd';
import Button from '../Button/Button';

const Login = ({ onLogin }) => {
  const onFinish = (values) => {
    onLogin(values);
  };

  return (
    <Form
      className="form page__flexbox-column"
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      autoComplete="off">
      <h3 className="form__title">Вход</h3>
      <fieldset className="form__box page__flexbox-column">
        <Form.Item
          className="form__box_inner"
          name="email"
          label="Почта"
          rules={[
            {
              type: 'email',
              message: 'Неверный формат почты!',
            },
            {
              min: 3,
              message: 'Почта должна содержать минимум 3 символа!',
            },
            {
              required: true,
              message: 'Введите вашу почту!',
            },
          ]}>
          <Input className="form__input" />
        </Form.Item>

        <Form.Item
          className="form__box_inner"
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введите ваш пароль!' },
            {
              min: 8,
              message: 'Пароль должен содержать минимум 8 символов!',
            },
          ]}>
          <Input.Password className="form__input" />
        </Form.Item>

        <Button btnClass={'button_type_login'} btnText="Войти" btnType="submit" />
      </fieldset>
    </Form>
  );
};
export default Login;
