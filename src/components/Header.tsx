import SearchBox from './SearchBox';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        HOME
      </button>
      <SearchBox />
    </header>
  );
};

export default Header;
