import React, { useContext } from 'react';
import { useState } from 'react';
import classes from './GenreSelector.module.css';

import { MovieContext } from '../Store/MoviesContext';
import { useNavigate } from 'react-router-dom';
const GenreSelector = () => {
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const navigate = useNavigate();

  // const getRandom = async (pg) => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmVlZmIyNWRhZTRmOWY5OWJjMzFjZDBlNzEzMzNmOSIsInN1YiI6IjYzZWE4NTFlMWYzZTYwMDA4NTkyMWUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2rW4zk5ShZ7EfK6ZVVlQnynIPoOb87NjFt_9RByNEc',
  //       },
  //     };

  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pg}&sort_by=popularity.desc&with_genres=${selectedGenre}`,
  //       options
  //     );
  //     const data = await res.json();
  //     const mvs: Movie[] = [];
  //     data.results.forEach((mov: FetchedMov) => {
  //       const movie: Movie = {
  //         genres: mov.genre_ids,
  //         language:
  //           mov.original_language === 'en' ? 'gb' : mov.original_language,
  //         title: mov.title,
  //         overview: mov.overview,
  //         image: mov.backdrop_path,
  //         releaseDate: mov.release_date,
  //         rating: mov.vote_average,
  //         id: mov.id,
  //         poster: mov.poster_path,
  //       };
  //       mvs.push(movie);

  //       dispatch({
  //         type: 'SETMOV',
  //         payload: mvs,
  //       });
  //     });

  //     sessionStorage.setItem('movies', JSON.stringify(mvs));
  //     dispatch({
  //       type: 'CLOSERANDOM',
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log(error.message);
  //     }
  //   }
  // };
  const dispatch = useContext(MovieContext).dispatch;
  // const page = useContext(MovieContext).state.page;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedGenre) {
      dispatch({
        type: 'SET_GENRE',
        payload: selectedGenre,
      });
      dispatch({
        type: 'SETPAGE',
        payload: 1,
      });
    }
  };

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const selected = e.currentTarget.value;
    switch (selected) {
      case 'action':
        setSelectedGenre(28);
        break;
      case 'comedy':
        setSelectedGenre(35);
        break;
      case 'documentary':
        setSelectedGenre(99);
        break;
      case 'thriller':
        setSelectedGenre(53);
        break;
      case 'romance':
        setSelectedGenre(10749);
        break;
      case 'sf':
        setSelectedGenre(878);
        break;
      default:
        break;
    }
  };

  return (
    <form className={classes.genreForm} onSubmit={handleSubmit}>
      <p>Select genre:</p>
      <div className={classes.radioOptions}>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='action'
            value={'action'}
          />
          <label htmlFor='action'>Action</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='comedy'
            value={'comedy'}
          />
          <label htmlFor='comedy'>Comedy</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='documentary'
            value={'documentary'}
          />
          <label htmlFor='documentary'>Documentary</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='romance'
            value={'romance'}
          />
          <label htmlFor='romance'>Romance</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='sf'
            value={'sf'}
          />
          <label htmlFor='sf'>Science Fiction</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='thriller'
            value={'thriller'}
          />
          <label htmlFor='thriller'>Thriller</label>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch({
            type: 'SET_RANDOM',
            payload: false,
          });
          dispatch({
            type: 'CLOSERANDOM',
          });
          navigate('/');
        }}
      >
        SEE ALL
      </button>
      <button
        type='button'
        onClick={() => {
          // dispatch({
          //   type: 'CLOSERANDOM',
          // });
          const randomNumber = Math.floor(Math.random() * 100);

          if (selectedGenre) {
            dispatch({
              type: 'SET_RANDOM',
              payload: true,
            });
            dispatch({
              type: 'SET_GENRE',
              payload: selectedGenre,
            });
            dispatch({
              type: 'SETPAGE',
              payload: randomNumber,
            });
            dispatch({
              type: 'CLOSERANDOM',
            });
            navigate('/');
          }
        }}
      >
        RANDOM MOVIE
      </button>
    </form>
  );
};

export default GenreSelector;
