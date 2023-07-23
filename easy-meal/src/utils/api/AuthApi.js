import { handleResponce } from "../functions";

export class Auth {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  register({email, password}) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => handleResponce(res));
  }

  authorize({email, password}) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => handleResponce(res));
  }

  checkToken(token) {
    return fetch(`${this.url}/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => handleResponce(res));
  }
}
