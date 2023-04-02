export class MoviesApi {
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
    return fetch(`${this._baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(this._checkStatus)
  }
}

const moviesApi = new MoviesApi(
  "https://api.nomoreparties.co/beatfilm-movies",
  {
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
