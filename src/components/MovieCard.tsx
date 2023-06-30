import classes from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
  rating: number;
  title: string;
  overview: string;
  poster: string;
  id: number;
};

const MovieCard = ({ rating, title, overview, poster, id }: MovieCardProps) => {
  const navigate = useNavigate();

  const getClassByRate = (vote: number): string => {
    if (vote >= 8) {
      return `${classes.green}`;
    } else if (vote >= 5) {
      return `${classes.orange}`;
    } else {
      return `${classes.red}`;
    }
  };
  const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
  return (
    <div
      onClick={() => {
        navigate(`movie/${id}`);
      }}
      className={classes.movie}
    >
      <img src={`${IMG_PATH + poster}`} alt={title} />
      <div className={classes.movieInfo}>
        <h3>{title}</h3>
        <span className={getClassByRate(rating)}>{rating}</span>
      </div>
      <div className={classes.overview}>
        <div className={classes.blur}></div>
        <h3>Overview</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
