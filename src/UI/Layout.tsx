import React from 'react';
import Header from '../components/Sidebar';
import classes from './Layout.module.css';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import RandomModal from '../components/RandomModal';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.layout}>
      <SearchBar />
      <aside className={classes.sidebar}>
        <Sidebar />
      </aside>
      <RandomModal />

      {children}
    </div>
  );
};

export default Layout;
