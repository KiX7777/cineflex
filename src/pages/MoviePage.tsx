import { useContext, useEffect, useCallback, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { MovieContext } from '../Context/MoviesContext';
import classes from './MoviePage.module.css';
import { genreMap, getCookie } from '../util/helpers';
import Rating from '../components/Rating';
import { Movie } from '../components/Movies';
import ImageGallery from '../components/ImageGallery';
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
};

const MoviePage = () => {
  const id = useParams().id as string;
  const ctx = useContext(MovieContext);
  const dispatch = ctx.dispatch;
  const rated = ctx.getRated;
  const [movie, setmovie] = useState<DetailedMovie>();
  const [myrating, setMyRating] = useState<number>();
  let movies;
  movies = ctx.state.movies;
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
        console.log(data);
        const genres = [];
        for (const genre in data.genres) {
          const g = data.genres[genre].name;
          genres.push(g);
        }
        const images: Awaited<string[]> = (await getMovieImgs(ID)).slice(0, 10);

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
          homepage: data.homepage,
          productionCompanies: data.production_companies,
        };

        console.log(movie);
        rated();
        const ratedMovies = JSON.parse(
          sessionStorage.getItem('rated') as string
        );
        const israted = ratedMovies.find((mov: Movie) => mov.id === movie.id);

        if (israted) {
          setMyRating(israted.rating);
        }
        getMovieImgs(ID);
        setmovie(movie);
      } catch (error) {
        console.log(error);
      }
    },
    [rated]
  );

  useEffect(() => {
    getMovie(+id);
  }, [id, getMovie]);

  const getFlag = (c: string) => {
    if (c) {
      return String.fromCodePoint(
        ...[...c.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
      );
    }
  };

  const getMovieImgs = async (id: number): Promise<string[]> => {
    const bearer = sessionStorage.getItem('bearer');

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${bearer}`,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
    const data = await res.json();
    interface ImageType {
      [key: string]: string | number | null;
    }

    const imgs: string[] = data.backdrops.map(
      (img: ImageType) => `https://image.tmdb.org/t/p/w1280${img.file_path}`
    );
    return imgs;
  };

  const productionComps = movie?.productionCompanies.map((comp) => {
    return (
      <div key={comp.id}>
        <img src={`https://image.tmdb.org/t/p/w45${comp.logo_path}`} />
        {/* <p>{comp.name}</p> */}
      </div>
    );
  });

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
                {/* {movie?.genres.map((g) => `${genreMap.get(g)}`).join(', ')} */}
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

            {/* {productionComps} */}
          </div>
          {movie.status === 'Released' && (
            <div className={classes.ratingStars}>
              {myrating && <Rating id={movie?.id} myrating={myrating} />}
              {!myrating && <Rating id={movie?.id} myrating={myrating} />}
            </div>
          )}
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
