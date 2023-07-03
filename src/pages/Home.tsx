import classes from './Home.module.css';
import Movies from '../components/Movies';
import { useContext } from 'react';
import { MovieContext } from '../Store/MoviesContext';
const Home = () => {
  const state = useContext(MovieContext).state;
  return (
    <div
      className={
        state.randomModal
          ? `${classes.home} ${classes.disableScroll}`
          : `${classes.home}`
      }
    >
      <Movies />
    </div>
  );
};

export default Home;
