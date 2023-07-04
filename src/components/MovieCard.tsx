import classes from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';
import Vote from './Vote';
import { useContext, memo } from 'react';
import { MovieContext } from '../Store/MoviesContext';
import { getFlag } from '../util/helpers';

type MovieCardProps = {
  rating: number;
  title: string;
  overview: string;
  poster: string;
  id: number;
  language: string;
  releaseDate: string;
};

const MovieCard = memo(
  ({
    rating,
    title,
    overview,
    poster,
    language,
    id,
    releaseDate,
  }: MovieCardProps) => {
    const navigate = useNavigate();
    const dispatch = useContext(MovieContext).dispatch;
    const year = new Date(releaseDate).getFullYear();
    console.log(year);
    const today = new Date().toISOString().slice(0, 10);

    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    return (
      <div
        onClick={() => {
          navigate(`movie/${id}`);
          dispatch({
            type: 'CLOSE_SIDEBAR',
          });
        }}
        className={classes.movie}
      >
        <img
          src={`${IMG_PATH + poster}`}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = '../src/assets/noimg.svg.webp';
          }}
        />
        <div className={classes.movieInfo}>
          <h3>{title}</h3>
          <div className={classes.sideInfo}>
            <p className={classes.year}>({year})</p>
            <span className={classes.cardLang}>
              {getFlag(language as string)}
            </span>
            {releaseDate < today ? (
              <Vote rating={rating} />
            ) : (
              <svg
                className={classes.futureIcon}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 11.663 21.9695 11.329 21.9375 11 L 21 11 L 19 11 L 19 13 L 19.9375 13 C 19.484018 16.611239 16.611239 19.484018 13 19.9375 L 13 19 L 11 19 L 11 19.9375 C 7.3887611 19.484018 4.5159822 16.611239 4.0625 13 L 5 13 L 5 11 L 4.0625 11 C 4.5159822 7.3887611 7.3887611 4.5159822 11 4.0625 L 11 5 L 13 5 L 13 4.0625 C 14.808222 4.2878598 16.428971 5.1164712 17.65625 6.34375 L 16 8 L 21 8 L 21 3 L 19.0625 4.9375 C 17.254707 3.1296817 14.753396 2 12 2 z M 11 7.03125 L 11 12.03125 L 11 12.4375 L 11.28125 12.71875 L 14.28125 15.71875 L 15.6875 14.28125 L 13 11.59375 L 13 7.03125 L 11 7.03125 z' />
              </svg>
            )}
          </div>
        </div>
        <div className={classes.overview}>
          <div className={classes.blur}></div>
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
);

export default MovieCard;
