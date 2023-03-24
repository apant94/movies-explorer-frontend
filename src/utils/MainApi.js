class MainApi {
  constructor(baseUrl, moviesUrl, { headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._moviesUrl = moviesUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }, 
    }).then(this._checkStatus);
  }

  setUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(this._checkStatus);
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: `${this._moviesUrl}${data.image.url}`,
          trailerLink: data.trailerLink,
          thumbnail: `${this._moviesUrl}${data.image.url}`,
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
      }),
    }).then(this._checkStatus);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

const mainApi = new MainApi(
  // "http://localhost:3000",
  "https://api.apantdiploma.nomoredomains.work",
  "https://api.nomoreparties.co",
  {
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;