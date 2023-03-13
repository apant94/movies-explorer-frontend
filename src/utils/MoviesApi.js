export class Api {
  constructor(baseUrl, { headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getMoviesCards() {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(this._checkStatus)
}
}

const api = new Api(
  "https://api.nomoreparties.co/beatfilm-movies",
  {
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
