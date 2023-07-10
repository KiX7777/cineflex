import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './UI/Layout';
import MoviePage from './pages/MoviePage';
import { Movie } from './components/Movies';
import { FetchedMov } from './components/Movies';
import { useEffect, useContext, useCallback } from 'react';
import { MovieContext } from './Store/MoviesContext';

const App = () => {
  const { dispatch } = useContext(MovieContext);
  const state = useContext(MovieContext).state;
  const page = state.page;
  const genre = state.genre;
  const sort = state.sort;

  const AUTH_URL =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=cbeefb25dae4f9f99bc31cd0e71333f9';

  const createSess = async () => {
    try {
      const res = await fetch(AUTH_URL);
      const data = await res.json();
      sessionStorage.setItem('sID', data.guest_session_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = useCallback(
    async (pg: number | 'SEARCH' | 'FAVORITES' = page): Promise<void> => {
      const bearer = sessionStorage.getItem('bearer');
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${bearer} `,
        },
      };

      if (typeof page !== 'number') {
        return;
      } else {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });

          let API_URL;
          if (!genre) {
            //SORTING

            API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pg}&sort_by=${sort}`;
          } else {
            API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pg}&sort_by=${sort}&with_genres=${genre}`;
          }

          const res = await fetch(API_URL, options);

          const data = await res.json();
          dispatch({
            type: 'SETTOTAL',
            payload: data.total_pages,
          });

          const mvs: Movie[] = [];
          data.results.forEach((mov: FetchedMov) => {
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
          });

          dispatch({ type: 'SET_LOADING', payload: false });
          sessionStorage.setItem('movies', JSON.stringify(mvs));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [dispatch, genre, page, sort]
  );

  useEffect(() => {
    const localSession = sessionStorage.getItem('sID');
    if (!localSession) {
      createSess();
    }
  }, []);

  useEffect(() => {
    if (page === 'SEARCH' || page === 'FAVORITES') {
      return;
    } else {
      getMovies(page);
    }
  }, [getMovies, page]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='*' element={<h1>404 not found...</h1>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
