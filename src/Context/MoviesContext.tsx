import { createContext, useReducer } from 'react';
import { Movie } from '../components/Movies';

type MovieContextObj = {
  state: MoviesState;
  dispatch: React.Dispatch<MovieActions>;
  getRated: () => void;
};

export const MovieContext = createContext<MovieContextObj>(
  {} as MovieContextObj
);

const getRated = async () => {
  const sID = sessionStorage.getItem('sID');
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sID}/rated/movies?api_key=cbeefb25dae4f9f99bc31cd0e71333f9`
    );
    if (res.ok) {
      const data = await res.json();
      const ratedMovies = data.results;
      console.log('Rated movies:', ratedMovies);
      sessionStorage.setItem('rated', JSON.stringify(ratedMovies));
    } else {
      throw new Error('Failed to fetch rated movies.');
    }
  } catch (error) {
    console.log(error);
  }
};

interface MoviesState {
  movies: Movie[];
  page: number;
  totalPages: number;
  genre: number | null;
  randomModal: boolean;
  loading: boolean;
}

type MovieActions =
  | SetMovies
  | IncrementPage
  | DecrementPage
  | ToggleRandom
  | CloseRandom
  | SetGenre
  | SetPage
  | SetTotalPages
  | SetLoading
  | Other;

type SetMovies = {
  type: 'SETMOV';
  payload: Movie[];
};
type IncrementPage = {
  type: 'INCREMENTPAGE';
};
type DecrementPage = {
  type: 'DECREMENTPAGE';
};
type SetPage = {
  type: 'SETPAGE';
  payload: number;
};
type SetTotalPages = {
  type: 'SETTOTAL';
  payload: number;
};
type CloseRandom = {
  type: 'CLOSERANDOM';
};
type ToggleRandom = {
  type: 'TOGGLE_RANDOM';
};
type SetGenre = {
  type: 'SET_GENRE';
  payload: number;
};
type SetLoading = {
  type: 'SET_LOADING';
  payload: boolean;
};

type Other = {
  type: 'OTHER';
};
const movieReducer = (state: MoviesState, action: MovieActions) => {
  switch (action.type) {
    case 'SETMOV':
      return {
        ...state,
        movies: action.payload,
      };
    case 'INCREMENTPAGE':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'DECREMENTPAGE':
      return {
        ...state,
        page: state.page - 1,
      };
    case 'SETPAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SETTOTAL':
      return {
        ...state,
        totalPages: state.totalPages,
      };
    case 'TOGGLE_RANDOM':
      return {
        ...state,
        randomModal: !state.randomModal,
      };
    case 'CLOSERANDOM':
      return {
        ...state,
        randomModal: false,
      };
    case 'SET_GENRE':
      return {
        ...state,
        genre: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'OTHER':
      return { ...state };
    default:
      return state;
  }
};
const initialState: MoviesState = {
  movies: [],
  page: 1,
  totalPages: 0,
  genre: null,
  randomModal: false,
  loading: false,
};

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
        getRated,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
