import { createContext, useReducer, useEffect } from 'react';
import { Movie } from '../components/Movies';

type MovieContextObj = {
  state: MoviesState;
  dispatch: React.Dispatch<MovieActions>;
  getRated: () => void;
  getMovieImgs: (id: number) => Promise<string[]>;
  getVideos: (id: number) => Promise<string[]>;
};

export const MovieContext = createContext<MovieContextObj>(
  {} as MovieContextObj
);

export const randomMovie = (movies: Movie[]) => {
  const randomNumber = Math.floor(Math.random() * 20);
  const randomMovie = movies[randomNumber];
  console.log(randomMovie);
};

const getMovieImgs = async (id: number): Promise<string[]> => {
  // get the movie images and return the array of img URLs
  const bearer = sessionStorage.getItem('bearer');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearer}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    options
  );
  const data = await res.json();
  interface ImageType {
    [key: string]: string | number | null;
  }

  const imgs: string[] = data.backdrops.map(
    (img: ImageType) => `https://image.tmdb.org/t/p/w1280${img.file_path}`
  );
  return imgs;
};

const getVideos = async (id: number): Promise<string[]> => {
  //get the movie videos and return YouTube keys
  const bearer = sessionStorage.getItem('bearer');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearer} `,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );

  const data = await res.json();
  interface VideoType {
    [key: string]: string | number | null;
  }
  const videos = data.results
    .filter((vid: VideoType) => vid.site === 'YouTube')
    .map((v: VideoType) => v.key);

  return videos;
};

const getRated = async (): Promise<void> => {
  // get all the rated movies for the guest user - session only
  const sID = sessionStorage.getItem('sID');
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sID}/rated/movies?api_key=cbeefb25dae4f9f99bc31cd0e71333f9`
    );
    if (res.ok) {
      const data = await res.json();
      const ratedMovies = data.results;
      const rated = data.results;
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
  favorites: Movie[];
  page: number | 'SEARCH' | 'FAVORITES';
  totalPages: number;
  genre: number | null;
  randomModal: boolean;
  loading: boolean;
  chosenMovie?: Movie;
  searchQuery?: string;
  error?: string;
  sidebarOpen: boolean;
  random: boolean;
  showSort: boolean;
  sort: string;
}

type MovieActions =
  | SetMovies
  | AddFavorite
  | DeleteFavorite
  | IncrementPage
  | DecrementPage
  | ToggleRandom
  | CloseRandom
  | SetGenre
  | SetPage
  | SetTotalPages
  | SetLoading
  | OpenSidebar
  | CloseSidebar
  | ToggleSidebar
  | SetError
  | ResetGenre
  | SetSearchQuery
  | SetRandom
  | ToggleSort
  | SetSort
  | Other;

type SetMovies = {
  type: 'SETMOV';
  payload: Movie[];
};
type AddFavorite = {
  type: 'ADD_FAV';
  payload: Movie;
};
type DeleteFavorite = {
  type: 'DEL_FAV';
  payload: number;
};
type IncrementPage = {
  type: 'INCREMENTPAGE';
};
type DecrementPage = {
  type: 'DECREMENTPAGE';
};
type SetPage = {
  type: 'SETPAGE';
  payload: number | 'SEARCH' | 'FAVORITES';
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
  payload: number | null;
};
type ResetGenre = {
  type: 'RESET_GENRE';
};
type SetLoading = {
  type: 'SET_LOADING';
  payload: boolean;
};
type OpenSidebar = {
  type: 'OPEN_SIDEBAR';
};
type ToggleSidebar = {
  type: 'TOGGLE_SIDEBAR';
};
type CloseSidebar = {
  type: 'CLOSE_SIDEBAR';
};
type SetSearchQuery = {
  type: 'SET_SEARCH';
  payload: string;
};

type SetError = {
  type: 'SET_ERROR';
  payload: string;
};
type SetRandom = {
  type: 'SET_RANDOM';
  payload: boolean;
};
type ToggleSort = {
  type: 'TOGGLE_SORT';
};
type SetSort = {
  type: 'SET_SORT';
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
    case 'ADD_FAV':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'DEL_FAV':
      return {
        ...state,
        favorites: state.favorites.filter((mov) => mov.id !== action.payload),
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

    case 'RESET_GENRE': {
      return {
        ...state,
        genre: null,
        page: 1,
      };
    }
    case 'SETTOTAL':
      return {
        ...state,
        totalPages: state.totalPages,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: false,
      };
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sidebarOpen: true,
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
    case 'SET_RANDOM':
      return {
        ...state,
        random: action.payload,
      };
    case 'TOGGLE_SORT':
      return {
        ...state,
        showSort: !state.showSort,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'OTHER':
      return { ...state };
    default:
      return state;
  }
};
const localFavs = JSON.parse(sessionStorage.getItem('favs') as string);
const params = new URLSearchParams(window.location.search);
const pageparam = params.get('page');
const sortparam = params.get('sort');
const genreparam = params.get('genre');

const initialState: MoviesState = {
  movies: [],
  page: pageparam ? +pageparam : 1,
  totalPages: 0,
  genre: genreparam ? +genreparam : null,
  randomModal: false,
  loading: false,
  sidebarOpen: false,
  favorites: localFavs ? localFavs : [],
  random: false,
  showSort: false,
  sort: sortparam ? sortparam : 'popularity.desc',
};

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem('favs', JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
        getRated,
        getMovieImgs,
        getVideos,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
