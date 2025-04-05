import { handleResponce } from "../functions";

export class AuthAdmin {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }


  checkToken() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => handleResponce(res));
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
      headers: this.headers,
    }).then((res) => handleResponce(res));
  }
}