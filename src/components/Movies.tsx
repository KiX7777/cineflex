import classes from './Movies.module.css';
import { useEffect, useState, useCallback, useContext } from 'react';
import MovieCard from './MovieCard';
import { MovieContext } from '../Context/MoviesContext';
import { useSearchParams } from 'react-router-dom';
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
  console.log(state.searchQuery);
  const rated = useContext(MovieContext).getRated;
  const movies = state.movies;
  const page = state.page;
  const totalPages = state.totalPages;
  // let API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cbeefb25dae4f9f99bc31cd0e71333f9&page=${page}`;
  let API_URL: string;

  const { dispatch } = useContext(MovieContext);

  const movieCards = movies.map((m) => (
    <MovieCard
      key={m.id + m.title}
      rating={m.rating}
      title={m.title}
      poster={m.poster}
      id={m.id}
      overview={m.overview}
    />
  ));
  useEffect(() => {
    if (page === 1) {
      setSearchParams();
    } else {
      setSearchParams({
        page: `${page}`,
      });
    }
  }, [page, setSearchParams, searchParams]);

  useEffect(() => {
    const pageparam = searchParams.get('page');

    if (pageparam) {
      console.log(pageparam);
      dispatch({
        type: 'SETPAGE',
        payload: +pageparam,
      });
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (state.searchQuery === '' || state.searchQuery === undefined) {
      searchParams.delete('search');
    } else {
      setSearchParams({
        search: state.searchQuery as string,
      });
    }
  }, [setSearchParams, state.searchQuery, searchParams]);

  return (
    <main className={classes.movies}>
      <button>RATE</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          searchParams.delete('search');
          setSearchParams({ search: 'dadada' });
        }}
      >
        GET RATED
      </button>
      {loading && <h1 className={classes.loadingMsg}>Loading...</h1>}
      <div className={classes.moviesContainer}>{movieCards}</div>
      <RandomModal />
      {!loading && (
        <div className={classes.pageButtons}>
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
          dispatch({
            type: 'TOGGLE_RANDOM',
          });
        }}
        className={classes.rdm}
      >
        <svg
          fill='#000000'
          height='800px'
          width='800px'
          version='1.1'
          id='Layer_1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          xmlSpace='preserve'
        >
          <g>
            <g>
              <g>
                <path
                  d='M21.333,149.327H64c18.773,0,37.227,4.928,53.333,14.272c3.371,1.963,7.061,2.88,10.688,2.88
				c7.36,0,14.528-3.819,18.475-10.624c5.931-10.197,2.432-23.253-7.744-29.163C116.117,113.594,90.283,106.66,64,106.66H21.333
				C9.536,106.66,0,116.218,0,127.994S9.536,149.327,21.333,149.327z'
                />
                <path
                  d='M320,149.327h42.667v64c0,8.192,4.715,15.68,12.075,19.221c2.965,1.408,6.123,2.112,9.259,2.112
				c4.757,0,9.472-1.6,13.333-4.672L504,144.655c5.056-4.053,8-10.176,8-16.661c0-6.485-2.944-12.608-8-16.661L397.333,25.999
				c-6.421-5.12-15.232-6.101-22.592-2.56s-12.075,11.029-12.075,19.221v64H320c-82.325,0-149.333,66.987-149.333,149.333
				c0,58.816-47.851,106.667-106.667,106.667H21.333C9.536,362.66,0,372.218,0,383.994s9.536,21.333,21.333,21.333H64
				c82.325,0,149.333-66.987,149.333-149.333C213.333,197.178,261.184,149.327,320,149.327z'
                />
                <path
                  d='M504,367.336l-106.667-85.333c-6.421-5.141-15.232-6.123-22.592-2.581c-7.36,3.563-12.075,11.029-12.075,19.243v64H320
				c-21.077,0-41.472-6.144-58.965-17.771c-9.856-6.485-23.061-3.861-29.568,5.973c-6.528,9.813-3.861,23.061,5.952,29.568
				c24.512,16.277,53.056,24.896,82.581,24.896h42.667v64c0,8.192,4.715,15.68,12.075,19.221c2.965,1.408,6.123,2.112,9.259,2.112
				c4.757,0,9.472-1.6,13.333-4.672L504,400.659c5.056-4.053,8-10.197,8-16.661C512,377.512,509.056,371.368,504,367.336z'
                />
              </g>
            </g>
          </g>
        </svg>
      </button>
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
