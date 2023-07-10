import classes from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MovieContext } from '../Store/MoviesContext';
const Sidebar = () => {
  const state = useContext(MovieContext).state;
  const navigate = useNavigate();
  const page = state.page;
  const dispatch = useContext(MovieContext).dispatch;
  const open = state.sidebarOpen;
  const random = state.random;
  return (
    <div
      className={
        open ? `${classes.sidebar} ${classes.open}` : `${classes.sidebar}`
      }
    >
      <div className={classes.sidebarBtns}>
        <button
          className={classes.homeBtn}
          onClick={() => {
            dispatch({
              type: 'SET_RANDOM',
              payload: false,
            });
            dispatch({
              type: 'CLOSE_SIDEBAR',
            });
            if (
              state.page === 'FAVORITES' ||
              state.page === 'SEARCH' ||
              random
            ) {
              dispatch({
                type: 'SETPAGE',
                payload: 1,
              });
            }
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

        {state.favorites.length > 0 && (
          <button
            onClick={() => {
              const favs = state.favorites;
              // navigate('/?page=FAVORITES');
              navigate('/');
              dispatch({
                type: 'SET_RANDOM',
                payload: false,
              });
              dispatch({
                type: 'SETPAGE',
                payload: 'FAVORITES',
              });
              dispatch({
                type: 'SETMOV',
                payload: favs,
              });
              dispatch({ type: 'SET_SEARCH', payload: '' });
            }}
            className={
              page === 'FAVORITES'
                ? `${classes.favoritesBtn} ${classes.active}`
                : `${classes.favoritesBtn}`
            }
          >
            <img src='../src/assets/favorites.svg' />
          </button>
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
        {typeof state.page !== 'string' && (
          <button
            className={classes.sortBtn}
            onClick={() => {
              dispatch({
                type: 'TOGGLE_SORT',
              });
            }}
          >
            <svg
              fill='#000000'
              height='800px'
              width='800px'
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 490 490'
              xmlSpace='preserve'
            >
              <g>
                <polygon
                  points='85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 
		0,194.27 37.087,221.213 	'
                />
                <polygon
                  points='404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 
		490,295.715 452.913,268.802 	'
                />
              </g>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
