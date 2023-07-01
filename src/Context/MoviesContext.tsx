import { createContext, useReducer } from 'react';
import { FetchedMov, Movie } from '../components/Movies';

type MovieContextObj = {
  state: MoviesState;
  dispatch: React.Dispatch<MovieActions>;
  getRated: () => void;
};

export const MovieContext = createContext<MovieContextObj>(
  {} as MovieContextObj
);

const getRated = async (): Promise<void> => {
  const sID = sessionStorage.getItem('sID');
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sID}/rated/movies?api_key=cbeefb25dae4f9f99bc31cd0e71333f9`
    );
    if (res.ok) {
      const data = await res.json();
      const ratedMovies = data.results;
      const rated = data.results;
      console.log('Rated movies:', ratedMovies);
      sessionStorage.setItem('rated', JSON.stringify(ratedMovies));
      return rated;
    } else {
      throw new Error('Failed to fetch rated movies.');
    }
  } catch (error) {
    console.log(error);
  }
};

interface MoviesState {
  movies: Movie[];
  page: number | 'SEARCH';
  totalPages: number;
  genre: number | null;
  randomModal: boolean;
  loading: boolean;
  chosenMovie?: Movie;
  searchQuery?: string;
  error?: string;
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
  | SetError
  | SetSearchQuery
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
  payload: number | 'SEARCH';
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
type SetSearchQuery = {
  type: 'SET_SEARCH';
  payload: string;
};

type SetError = {
  type: 'SET_ERROR';
  payload: string;
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
      if (typeof state.page === 'number') {
        return {
          ...state,
          page: state.page + 1,
        };
      } else {
        return state;
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'DECREMENTPAGE':
      if (typeof state.page === 'number') {
        return {
          ...state,
          page: state.page - 1,
        };
      } else {
        return state;
      }
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
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'OTHER':
      return { ...state };
    default:
      return state;
  }
};
const localPage = sessionStorage.getItem('page') as string;
console.log(localPage);
if (!localPage) {
  console.log('nema stranice lokalno');
}

const initialState: MoviesState = {
  movies: [],
  page: +localPage || 1,
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
