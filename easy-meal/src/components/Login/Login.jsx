// import React from 'react';

import './Login.css';
import { Form, Input } from 'antd';
import Button from '../Button/Button';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (
  <Form
    className="form"
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    // style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off">
    <h3 className="form__title">Login</h3>

    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input className="form__imput" />
    </Form.Item>

    <Form.Item
      className="form__imput"
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}>
      <Input.Password />
    </Form.Item>

    <Button
      btnClass={'button_type_login'}
      btnText="Войти"
      btnType="submit"
      // onClick={}
    />
  </Form>
);

export default Login;
