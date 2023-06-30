import classes from './MovieCard.module.css';
import { useNavigate } from 'react-router-dom';
import Vote from './Vote';

type MovieCardProps = {
  rating: number;
  title: string;
  overview: string;
  poster: string;
  id: number;
};

const MovieCard = ({ rating, title, overview, poster, id }: MovieCardProps) => {
  const navigate = useNavigate();

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
        <Vote rating={rating} />
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
