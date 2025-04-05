import { create } from 'zustand';
import { API_BACKEND } from '../../utils/config';
import { AuthAdmin } from '../../utils/api/AdminApi';

const auth = new AuthAdmin({
  url: API_BACKEND,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useAdminStore = create((set) => ({
  // Состояние
  isAdmin: false,
  loading: false,
  error: null,
  
  // Действия
  login: async (login, password) => {
    set({ loading: true, error: null });
    try {
      const data = await auth.adminLogin({ login, password });
      localStorage.setItem('adminToken', data.token);
      set({ isAdmin: true, loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },
  
  checkAuth: async () => {
    set({ loading: true });
    try {
      await auth.checkAdmin();
      set({ isAdmin: true, loading: false });
      return true;
    } catch {
      set({ isAdmin: false, loading: false });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ isAdmin: false });
  }
}));