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
        className={classes.homeBtn}
        onClick={() => {
          navigate('/');
        }}
      >
        <svg
          fill='#000000'
          version='1.1'
          id='Capa_1'
          xmlns='http://www.w3.org/2000/svg'
          width='800px'
          height='800px'
          viewBox='0 0 448.512 448.512'
          xmlSpace='preserve'
        >
          <g>
            <path
              d='M444.277,215.253L242.72,52.441l-11.186-9.289c-4.22-3.506-10.34-3.506-14.559,0l-58.162,48.301V71.031
		c0-6.294-5.104-11.397-11.396-11.397h-43.449c-6.293,0-11.396,5.104-11.396,11.397v75.233L4.191,218.371
		c-4.875,3.979-5.605,11.157-1.625,16.035c2.254,2.764,5.531,4.193,8.836,4.193c2.533,0,5.082-0.841,7.203-2.565l34.477-28.126
		v188.684c0,6.294,5.102,11.397,11.396,11.397h121.789c6.295,0,11.398-5.104,11.398-11.397v-88.426h53.18v88.426
		c0,6.294,5.104,11.397,11.398,11.397h121.789c6.295,0,11.397-5.104,11.397-11.397V205.101l34.521,27.884
		c2.108,1.702,4.643,2.532,7.158,2.532c3.321,0,6.622-1.447,8.87-4.235C449.937,226.384,449.173,219.208,444.277,215.253z
		 M115.366,82.428h20.652v27.164l-20.652,16.716V82.428z M372.636,189.958v195.235h-98.994v-88.427
		c0-6.294-5.104-11.396-11.397-11.396h-75.977c-6.295,0-11.396,5.104-11.396,11.396v88.427H75.877V189.958l44.309-36.798
		c0,0,103.748-85.009,104.41-86.141L372.636,189.958z'
            />
          </g>
        </svg>
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
