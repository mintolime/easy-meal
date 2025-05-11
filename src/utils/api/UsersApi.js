import { handleResponce } from '../functions';

export class UsersApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getUsers() {
        return fetch(`${this._url}/users/usersAll`, {
            headers: this._headers,
        }).then((res) => handleResponce(res));
    }
}
