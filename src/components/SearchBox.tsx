import { MovieContext } from '../Context/MoviesContext';
import { getCookie } from '../util/helpers';
import classes from './searchBox.module.css';
import { Movie, FetchedMov } from './Movies';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
const SearchBox = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useContext(MovieContext).dispatch;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const movieSearch = async (movie: string): Promise<void> => {
    const bearer = getCookie('bearerToken');

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

      console.log(data);
      dispatch({
        type: 'SETTOTAL',
        payload: data.total_pages,
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

        dispatch({
          type: 'SETMOV',
          payload: mvs,
        });
        navigate('/');
      });

      dispatch({ type: 'SET_LOADING', payload: false });
      sessionStorage.setItem('movies', JSON.stringify(mvs));

      if (!res.ok) {
        throw new Error('Problem while getting data.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    movieSearch(searchQuery);
    dispatch({ type: 'SET_SEARCH', payload: searchQuery });
    setSearchQuery('');

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
      </form>
    </div>
  );
};

export default SearchBox;
