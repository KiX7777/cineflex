import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../Context/MoviesContext';
import classes from './MoviePage.module.css';
import { genreMap } from '../util/genres';
import Rating from '../components/Rating';
import { FetchedMov, Movie } from '../components/Movies';

const MoviePage = () => {
  const id = useParams().id as string;
  const ctx = useContext(MovieContext);
  const rated = ctx.getRated;
  let movies;
  movies = ctx.state.movies;
  console.log(movies);
  if (movies.length === 0) {
    movies = JSON.parse(sessionStorage.getItem('movies') as string);
  }

  const ratedMovies = JSON.parse(sessionStorage.getItem('rated') as string);
  console.log(ratedMovies);

  useEffect(() => {
    rated();
  }, [rated]);

  const getFlag = (c: string) =>
    String.fromCodePoint(
      ...[...c.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
    );

  const movie = movies.find((move: Movie) => move.id === +id) as Movie;
  console.log(movie);
  let isRated, myRating;
  if (ratedMovies) {
    isRated = ratedMovies.find((mov: FetchedMov) => mov.title === movie.title);
    if (isRated) {
      myRating = isRated.rating;
    }
  }
  console.log(myRating);

  return (
    <div className={classes.moviePage}>
      <div
        className={classes.backdrop}
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${movie?.image}')`,
        }}
      >
        <h1 className={classes.title}>{movie?.title}</h1>
        <span className={classes.overview}>{movie?.overview}</span>
        <span className={classes.blur}></span>
      </div>
      <div className={classes.text}>
        <div className={classes.movieInfo}>
          <p>
            <strong>Rating</strong>: {movie?.rating}
          </p>
          <div className={classes.genres}>
            <p>
              <strong>Genres: </strong>
              {movie?.genres.map((g) => `${genreMap.get(g)}`).join(', ')}
            </p>
          </div>

          <p>
            <strong>Language</strong>: {getFlag(movie?.language as string)}
          </p>
        </div>
        <div className={classes.ratingStars}>
          <Rating id={movie.id} myrating={myRating} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
