import { useContext, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../Store/MoviesContext';
import classes from './MoviePage.module.css';
import Rating from '../components/Rating';
import { Movie } from '../components/Movies';
import ImageGallery from '../components/ImageGallery';
import { getFlag } from '../util/helpers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import MoviePageSkeleton from '../UI/MoviePageSkeleton';

type DetailedMovie = Movie & {
  productionCompanies: {
    [key: string]: string | number;
  }[];
  homepage: string;
  poster: string;
  releaseDate: string;
  images?: string[];
  status: string;
  videos?: string[];
};

const MoviePage = () => {
  const id = useParams().id as string;
  const ctx = useContext(MovieContext);
  const rated = ctx.getRated;
  const getMovieImgs = ctx.getMovieImgs;
  const getVideos = ctx.getVideos;
  const [movie, setmovie] = useState<DetailedMovie>();
  const [myrating, setMyRating] = useState<number>();
  let movies;
  movies = ctx.state.movies;

  // if there are no movies in the state look in the session storage
  if (movies.length === 0) {
    movies = JSON.parse(sessionStorage.getItem('movies') as string);
  }

  const getMovie = useCallback(
    async (ID: number) => {
      const bearer = sessionStorage.getItem('bearer');
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${bearer} `,
          },
        };

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${ID}?language=en-US`,
          options
        );

        const data = await res.json();
        const genres = [];
        for (const genre in data.genres) {
          const g = data.genres[genre].name;
          genres.push(g);
        }

        //get movie images and videos
        const images: Awaited<string[]> = (await getMovieImgs(ID)).slice(0, 10);
        const videos: Awaited<string[]> = (await getVideos(ID)).slice(0, 5);

        const movie: DetailedMovie = {
          genres: genres,
          language:
            data.original_language === 'en' ? 'gb' : data.original_language,
          title: data.title,
          overview: data.overview,
          image: data.backdrop_path,
          releaseDate: data.release_date,
          rating: data.vote_average.toFixed(1),
          id: data.id,
          poster: data.poster_path,
          status: data.status,
          images,
          videos,
          homepage: data.homepage,
          productionCompanies: data.production_companies,
        };
        // get all the rated movies for the guest user and store them in session storage
        rated();
        // get those rated movies, and if there are any, see if the current movie is rated
        const ratedMovies = JSON.parse(
          sessionStorage.getItem('rated') as string
        );

        if (ratedMovies) {
          const israted = ratedMovies.find((mov: Movie) => mov.id === movie.id);
          //if it is rated, update my rating (stars) for the movie
          if (israted) {
            setMyRating(israted.rating);
          }
        }

        setmovie(movie);
      } catch (error) {
        console.log(error);
      }
    },
    [rated, getMovieImgs, getVideos]
  );

  useEffect(() => {
    getMovie(+id);
  }, [id, getMovie]);

  //convert language code to emoji flags

  if (!movie) {
    return <MoviePageSkeleton />;
  } else {
    return (
      <div className={classes.moviePage}>
        {movie?.images && (
          <ImageGallery
            images={movie?.images as string[]}
            title={movie.title}
            overview={movie.overview}
            videos={movie.videos}
            rating={movie.rating}
          />
        )}

        <div className={classes.text}>
          <div className={classes.movieInfo}>
            {movie.status === 'Released' && (
              <p>
                <strong>Rating</strong>: {movie?.rating}
              </p>
            )}

            <div className={classes.genres}>
              <p>
                <strong>Genres: </strong>
                {movie?.genres.join(', ')}
              </p>
            </div>
            {movie.status === 'Released' && (
              <p>
                <strong>Release date: </strong>
                {`${new Date(
                  movie?.releaseDate as string
                ).toLocaleDateString()}`}
              </p>
            )}
            <p>
              <strong>Language:</strong> {getFlag(movie?.language as string)}
            </p>
            <p>
              {movie.status.includes('Production') &&
                `To be released ${new Date(
                  movie.releaseDate
                ).toLocaleDateString()}`}
            </p>

            <p>
              <strong>Production companies: </strong>
              {movie.productionCompanies.map((p) => p.name).join(', ')}
            </p>
          </div>
          <div className={classes.interactionBtns}>
            {movie.status === 'Released' && (
              <div className={classes.ratingStars}>
                {myrating && <Rating id={movie?.id} myrating={myrating} />}
                {!myrating && <Rating id={movie?.id} myrating={myrating} />}
              </div>
            )}
            <button
              className={
                ctx.state.favorites.find((mov) => mov.id === movie.id)
                  ? `${classes.addFavoriteBtn} ${classes.fav}`
                  : `${classes.addFavoriteBtn}`
              }
              onClick={() => {
                const isFav = ctx.state.favorites.find(
                  (mov) => mov.id === movie.id
                );
                if (isFav) {
                  ctx.dispatch({
                    type: 'DEL_FAV',
                    payload: movie.id,
                  });
                } else {
                  ctx.dispatch({
                    type: 'ADD_FAV',
                    payload: movie,
                  });
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                shapeRendering='geometricPrecision'
                textRendering='geometricPrecision'
                imageRendering='optimizeQuality'
                fillRule='evenodd'
                clipRule='evenodd'
                viewBox='0 0 512 446.04'
              >
                <path
                  stroke='#333'
                  strokeWidth={15}
                  d='M252.63 71.41C285.88 36.72 309.17 6.75 360.44.86c96.22-11.07 184.7 87.44 136.11 184.43-.43.85-.88 1.71-1.33 2.58-27.38-23.8-63.15-38.22-102.25-38.22-43.06 0-82.07 17.47-110.29 45.7-28.23 28.23-45.7 67.23-45.7 110.29s17.47 82.06 45.7 110.29l.15.15-30.2 29.96-59.71-57.51C121.09 319.33 3.95 232.26.09 124.36-2.62 48.79 57.02.37 125.62 1.27c61.31.8 87.08 31.31 127.01 70.14zm120.41 187.25c-.04-5.88-.59-10.08 6.71-9.97l23.61.28c7.62-.04 9.64 2.37 9.56 9.51v27.24h27.03c5.88-.05 10.08-.59 9.97 6.7l-.28 23.61c.04 7.62-2.37 9.65-9.51 9.56h-27.21v27.21c.08 7.14-1.94 9.56-9.56 9.51l-23.61.28c-7.3.11-6.75-4.09-6.71-9.96v-27.04h-27.23c-7.14.09-9.56-1.94-9.51-9.56l-.29-23.61c-.1-7.29 4.1-6.75 9.97-6.7h27.06v-27.06zm19.93-72.05c32.87 0 62.63 13.32 84.17 34.86S512 272.77 512 305.64c0 32.88-13.33 62.64-34.86 84.17-21.54 21.54-51.31 34.86-84.17 34.86-32.88 0-62.64-13.32-84.17-34.86-21.54-21.54-34.87-51.3-34.87-84.17 0-32.88 13.33-62.63 34.86-84.17 21.54-21.54 51.31-34.86 84.18-34.86zm71.79 47.23c-18.37-18.37-43.75-29.74-71.79-29.74-28.04 0-53.43 11.37-71.81 29.74-18.37 18.37-29.73 43.76-29.73 71.8s11.36 53.43 29.74 71.8c18.37 18.37 43.75 29.74 71.8 29.74 28.03 0 53.42-11.37 71.8-29.74 18.37-18.37 29.73-43.76 29.73-71.8s-11.36-53.43-29.74-71.8z'
                />
              </svg>
            </button>
          </div>

          {movie.status.includes('Production') && (
            <AddToCalendarButton
              name={movie.title}
              startDate={movie.releaseDate}
              description={`Release of ${movie.title}`}
              lightMode='dark'
              hideCheckmark
              options={['Google', 'Apple', 'iCal']}
            ></AddToCalendarButton>
          )}
        </div>
      </div>
    );
  }
};

export default MoviePage;
