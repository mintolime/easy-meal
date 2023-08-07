// import React from 'react';

import "./Login.css";
import { Form, Input } from "antd";
import Button from "../Button/Button";

const Login = ({ onLogin }) => {
  
  const onFinish = (values) => {
    onLogin(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      className="form page__flexbox-column"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // style={{ maxWidth: 600 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3 className="form__title">Вход</h3>
      <fieldset className="form__box page__flexbox-column">
        <Form.Item
          className="form__box_inner"
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "В почте содержатся ошибки, попробуйте снова!",
            },
            {
              required: true,
              message: "Введите вашу почту!",
            },
          ]}
        >
          <Input className="form__input" />
        </Form.Item>

        <Form.Item
          className="form__box_inner"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Введите ваш пароль!" }]}
        >
          <Input.Password className="form__input" />
        </Form.Item>
      </fieldset>

      <Button
        btnClass={"button_type_login"}
        btnText="Войти"
        btnType="submit"
        // onClick={}
      />
    </Form>
  );
};
export default Login;
