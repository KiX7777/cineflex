import React, { useContext } from 'react';
import classes from './Layout.module.css';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import RandomModal from '../components/RandomModal';
import { MovieContext } from '../Store/MoviesContext';
import { AnimatePresence } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const modal = useContext(MovieContext).state.randomModal;
  return (
    <div className={classes.layout}>
      <SearchBar />
      <aside className={classes.sidebar}>
        <Sidebar />
      </aside>
      <AnimatePresence>{modal && <RandomModal />}</AnimatePresence>
      {children}
    </div>
  );
};

export default Layout;
