import classes from './Home.module.css';
import Movies from '../components/Movies';
import { useContext } from 'react';
import { MovieContext } from '../Store/MoviesContext';
import Sorting from '../components/Sorting';
import { motion } from 'framer-motion';
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Home = () => {
  const state = useContext(MovieContext).state;
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={
        state.randomModal
          ? `${classes.home} ${classes.disableScroll}`
          : `${classes.home}`
      }
    >
      {<Sorting />} <Movies />
    </motion.div>
  );
};

export default Home;
