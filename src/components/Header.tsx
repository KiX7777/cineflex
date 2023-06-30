import SearchBox from './SearchBox';
import classes from './Header.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { MovieContext } from '../Context/MoviesContext';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useContext(MovieContext).dispatch;
  const [, setSearchParams] = useSearchParams();
  return (
    <header className={classes.header}>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        HOME
      </button>
      <SearchBox />
      <button
        onClick={() => {
          dispatch({
            type: 'SETPAGE',
            payload: 1,
          });
          dispatch({ type: 'SET_SEARCH', payload: '' });
          setSearchParams({});
          navigate('/');
        }}
      >
        CLEAR SEARCH
      </button>
    </header>
  );
};

export default Header;
