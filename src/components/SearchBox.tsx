import { MovieContext } from '../Store/MoviesContext';
import classes from './searchBox.module.css';
import { Movie, FetchedMov } from './Movies';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
const SearchBox = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useContext(MovieContext).dispatch;
  const state = useContext(MovieContext).state;
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const movieSearch = async (movie: string): Promise<void> => {
    const bearer = sessionStorage.getItem('bearer');

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${bearer}`,
      },
    };

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      console.log(data);

      if (data.results.length === 0) {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_ERROR', payload: 'No results found.' });

        return;
      }

      console.log(data);
      dispatch({
        type: 'SETTOTAL',
        payload: data.total_pages,
      });
      dispatch({
        type: 'SETPAGE',
        payload: 'SEARCH',
      });

      const mvs: Movie[] = [];
      data.results.slice(0, 10).forEach((mov: FetchedMov) => {
        const movie: Movie = {
          genres: mov.genre_ids,
          language:
            mov.original_language === 'en' ? 'gb' : mov.original_language,
          title: mov.title,
          overview: mov.overview,
          image: mov.backdrop_path,
          releaseDate: mov.release_date,
          rating: +mov.vote_average.toFixed(1),
          id: mov.id,
          poster: mov.poster_path,
        };
        mvs.push(movie);
        console.log(mvs);

        dispatch({
          type: 'SETMOV',
          payload: mvs,
        });
        navigate('/');
      });

      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_ERROR', payload: '' });

      sessionStorage.setItem('movies', JSON.stringify(mvs));

      if (!res.ok) {
        dispatch({ type: 'SET_ERROR', payload: 'Problem while getting data.' });
        throw new Error('Problem while getting data.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch({
      type: 'SET_RANDOM',
      payload: false,
    });
    movieSearch(searchQuery);
    dispatch({ type: 'SET_SEARCH', payload: searchQuery });

    // if (location.pathname !== '/') {
    //   navigate('/');
    // }   setSearchParams({
  };

  return (
    <div className={classes.inputbox}>
      <form
        onSubmit={handleSubmit}
        className={
          openSearch ? `${classes.search} ${classes.open}` : `${classes.search}`
        }
      >
        <input
          type='text'
          placeholder='e.g. Die Hard'
          required
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className={classes.formInput}
          minLength={2}
        />
        <span
          onClick={() => {
            dispatch({
              type: 'SETPAGE',
              payload: 1,
            });
            dispatch({ type: 'SET_SEARCH', payload: '' });
            setSearchQuery('');
            setSearchParams({});
            dispatch({ type: 'SET_GENRE', payload: 0 });
            navigate('/');
          }}
          className={
            searchQuery && openSearch
              ? `${classes.clearSearch} ${classes.show}`
              : `${classes.clearSearch}`
          }
        >
          <svg
            version='1.1'
            x='0px'
            y='0px'
            viewBox='0 0 1000 1000'
            enableBackground='new 0 0 1000 1000'
            xmlSpace='preserve'
          >
            <g>
              <path d='M500,990C229.3,990,10,770.7,10,500S229.3,10,500,10c270.7,0,490,219.3,490,490S770.7,990,500,990z M747,322.8l-55.7-55.7L510,448.4L328.6,267.1l-55.7,55.7l181.4,181.4L271.8,686.7l55.7,55.7L510,559.9l182.5,182.5l55.7-55.7L565.6,504L747,322.8z' />
            </g>
          </svg>
        </span>
        <span
          className={classes.searchicon}
          onClick={() => {
            setOpenSearch((prev) => !prev);
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </span>
        {state.error && openSearch && (
          <span className={classes.error}>{state.error}</span>
        )}{' '}
      </form>
    </div>
  );
};

export default SearchBox;
