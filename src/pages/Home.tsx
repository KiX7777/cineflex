import classes from './Home.module.css';
import Movies from '../components/Movies';
import { useContext } from 'react';
import { MovieContext } from '../Context/MoviesContext';

const Home = () => {
  const state = useContext(MovieContext).state;
  console.log('render');
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
