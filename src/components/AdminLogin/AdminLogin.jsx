import { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const { login, loading, error } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.login, formData.password);
    if (success) navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login">
      <h2>Вход для администратора</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
