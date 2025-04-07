import { Form, Input } from 'antd';
import Button from '../Button/Button';

const Register = ({ onRegister }) => {
  const onFinish = (values) => {
    onRegister(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className="form page__flexbox-column"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <h3 className="form__title">Регистрация</h3>

      <fieldset className="form__box page__flexbox-column">
        <Form.Item
          className="form__box_inner"
          name="email"
          label="E-mail"
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
          label="Password"
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

        <Button btnClass={'button_type_login'} btnText="Зарегистрироваться" btnType="submit" />
        <Button />
      </fieldset>
    </Form>
  );
};

export default Register;
