import React, { useContext, useRef } from 'react';
import { useState } from 'react';
import classes from './GenreSelector.module.css';

import { MovieContext } from '../Store/MoviesContext';
import { useLocation, useNavigate } from 'react-router-dom';
const GenreSelector = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>();
  const navigate = useNavigate();
  const genre = useContext(MovieContext).state.genre;
  const dispatch = useContext(MovieContext).dispatch;
  const url = useLocation().pathname;
  const formRef = useRef<HTMLFormElement>(null);
  const isMoviePage = url.startsWith('/movie');
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
    <form ref={formRef} className={classes.genreForm} onSubmit={handleSubmit}>
      <label>Select genre:</label>
      <div className={classes.radioOptions}>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            id='action'
            defaultChecked={genre === 28}
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
            defaultChecked={genre === 35}
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
            defaultChecked={genre === 99}
            value={'documentary'}
          />
          <label htmlFor='documentary'>Documentary</label>
        </div>
        <div className={classes.radioOption}>
          <input
            onChange={handleRadioChange}
            type='radio'
            name='genre'
            defaultChecked={genre === 10749}
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
            defaultChecked={genre === 878}
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
            defaultChecked={genre === 53}
          />
          <label htmlFor='thriller'>Thriller</label>
        </div>
      </div>
      <div className={classes.btns}>
        {genre && !isMoviePage && (
          <button
            onClick={() => {
              dispatch({ type: 'RESET_GENRE' });
              setSelectedGenre(null);
              formRef.current?.reset();
            }}
          >
            RESET
          </button>
        )}
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
      </div>
    </form>
  );
};

export default GenreSelector;
