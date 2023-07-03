import classes from './Movies.module.css';
import { useEffect, useState, useCallback, useContext } from 'react';
import MovieCard from './MovieCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MovieContext } from '../Store/MoviesContext';
import RandomModal from './RandomModal';

export type Movie = {
  id: number;
  language: string;
  title: string;
  overview: string;
  image: string;
  releaseDate: string;
  rating: number;
  poster: string;
  genres: number[];
};
export type FetchedMov = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Movies = () => {
  const state = useContext(MovieContext).state;
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = state.genre;
  const loading = state.loading;
  const random = state.random;
  const rated = useContext(MovieContext).getRated;
  const movies = state.movies;
  const page = state.page;
  const totalPages = state.totalPages;
  const navigate = useNavigate();
  // let API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cbeefb25dae4f9f99bc31cd0e71333f9&page=${page}`;
  let API_URL: string;

  const { dispatch } = useContext(MovieContext);

  // useEffect(() => {
  //   if (page === 'FAVORITES') {
  //     const favs = state.favorites;
  //     movies = favs;
  //     console.log('sad');
  //   } else {
  //     movies = state.movies;
  //   }
  // }, [page]);

  const movieCards = movies.map((m) => (
    <MovieCard
      key={m.id + m.title}
      rating={m.rating}
      title={m.title}
      poster={m.poster}
      id={m.id}
      language={m.language}
      overview={m.overview}
      releaseDate={m.releaseDate}
    />
  ));

  useEffect(() => {
    const pageparam = searchParams.get('page');

    if (pageparam) {
      console.log(pageparam);
      dispatch({
        type: 'SETPAGE',
        payload: pageparam === 'FAVORITES' ? 'FAVORITES' : +pageparam,
      });
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    setSearchParams({
      ...(state.searchQuery && { search: state.searchQuery }),
      ...(page !== 1 && page !== 'SEARCH' && { page: `${page}` }),
    });
  }, [setSearchParams, state.searchQuery, searchParams, page]);

  useEffect(() => {
    if (random) {
      const rdmMovie = movies[Math.floor(Math.random() * 20)];
      console.log(rdmMovie);
      navigate(`movie/${rdmMovie.id}`);
    }
  }, [movies, random, navigate]);

  return (
    <main className={classes.movies}>
      {/* <button>RATE</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          searchParams.delete('search');
          setSearchParams({ search: 'dadada' });
        }}
      >
        GET RATED
      </button> */}
      {loading && <h1 className={classes.loadingMsg}>Loading...</h1>}
      <div className={classes.moviesContainer}>
        {movies.length > 0 && movieCards}
        {movies.length === 0 && page !== 'FAVORITES' && !loading && (
          <h1>Could not get data...</h1>
        )}
        {movies.length === 0 && page == 'FAVORITES' && (
          <h1>No favorites added...</h1>
        )}
        {/* {movies.length > 0 && page === 'FAVORITES' ? (
          movieCards
        ) : (
          <h1>No favorites added...</h1>
        )} */}
      </div>
      {/* <button onClick={console.log('first')}>RANDOM</button> */}
      {!loading && page !== 'SEARCH' && page !== 'FAVORITES' && (
        <div className={classes.pageButtons}>
          {page !== 1 && (
            <button
              onClick={() => {
                dispatch({
                  type: 'SETPAGE',
                  payload: 1,
                });
              }}
            >
              1
            </button>
          )}
          {page !== 1 && (
            <button
              onClick={() => {
                if (page === 1) {
                  return;
                }

                dispatch({
                  type: 'DECREMENTPAGE',
                });
              }}
            >
              BACK
            </button>
          )}

          {page !== totalPages && (
            <button
              onClick={() => {
                if (page === totalPages) {
                  return;
                }
                dispatch({
                  type: 'INCREMENTPAGE',
                });
              }}
            >
              NEXT PAGE
            </button>
          )}
        </div>
      )}

      <button
        onClick={() => {
          console.log(state);
        }}
      >
        STATE
      </button>
    </main>
  );
};

export default Movies;
