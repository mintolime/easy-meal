import { Form, Input } from "antd";
import "./Register.css";
import Button from "../Button/Button";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register = () => (
  <Form
    className="form"
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    // style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <h3 className="form__title">Регистрация</h3>

    <Form.Item
      className="form__inner"
      label="Username"
      name="username"
      rules={[{ required: true, message: "Введите ваше имя!" }]}
    >
      <Input className="form__input" />
    </Form.Item>

    <Form.Item
      className="form__inner"
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
      className="form__inner"
      label="Password"
      name="password"
      rules={[{ required: true, message: "Введите ваш пароль!" }]}
    >
      <Input.Password className="form__input" />
    </Form.Item>

    <Button
      btnClass={"button_type_login"}
      btnText="Зарегистрироваться"
      btnType="submit"
      // onClick={}
    />
    <Button />
  </Form>
);

export default Register;