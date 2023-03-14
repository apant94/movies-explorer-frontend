import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({movies}) {
  return(
    <section className='movieslist'>
      {movies.map((movie) => (
        <MoviesCard movie={movie} key={movie.id || movie.movieId} />
      ))}
      <button className='movieslist__button' type='button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;