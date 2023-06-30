import SearchBox from './SearchBox';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <SearchBox />
    </header>
  );
};

export default Header;
