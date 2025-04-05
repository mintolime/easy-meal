import { handleResponce } from "../functions";

export class AuthAdmin {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }



  // Новые методы для админ-панели
  adminLogin({ login, password }) {
    return fetch(`${this.url}/admin/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ login, password }),
    }).then((res) => handleResponce(res));
  }

  checkAdmin() {
    return fetch(`${this.url}/admin/check`, {
      method: "GET",
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
    }).then((res) => handleResponce(res));
  }
}