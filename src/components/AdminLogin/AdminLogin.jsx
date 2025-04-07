import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAdminStore } from '../store/adminStore';
import { useNavigate } from 'react-router';
import './AdminLogin.css';

const { Title } = Typography;

const AdminLogin = () => {
  const [form] = Form.useForm();
  const { login, loading, error } = useAdminStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await login(values.login, values.password);
    if (success) navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-container">
      <Card className="admin-login-card">
        <div className="admin-login-header">
          <Title level={3} style={{ textAlign: 'center' }}>
            Вход для администратора
          </Title>
        </div>

        <Form
          form={form}
          name="admin_login"
          className="admin-login-form"
          onFinish={onFinish}
          autoComplete="off">
          {error && (
            <Form.Item>
              <Alert message={error} type="error" showIcon closable style={{ marginBottom: 24 }} />
            </Form.Item>
          )}

          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите логин!',
              },
              {
                min: 3,
                message: 'Логин должен содержать минимум 3 символа!',
              },
              {
                max: 20,
                message: 'Логин должен быть не длиннее 20 символов!',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'Только латинские буквы, цифры и подчеркивание!',
              },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Логин"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
              {
                min: 8,
                message: 'Пароль должен содержать минимум 8 символов!',
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message: 'Пароль должен содержать заглавные, строчные буквы, цифры и спецсимволы!',
              },
            ]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
