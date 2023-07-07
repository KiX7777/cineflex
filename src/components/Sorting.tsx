import { useContext, memo } from 'react';
import classes from './Sorting.module.css';
import { MovieContext } from '../Store/MoviesContext';

const Sorting = memo(() => {
  // const [sort, setSort] = useState<string>('popularityDesc');
  const state = useContext(MovieContext).state;
  const dispatch = useContext(MovieContext).dispatch;

  return (
    <div
      className={
        state.showSort
          ? `${classes.sorting} ${classes.show}`
          : `${classes.sorting}`
      }
    >
      <select
        name='sorting'
        id='sorting'
        defaultValue={'popularity.desc'}
        onChange={(e) => {
          // setSort(e.currentTarget.value);
          dispatch({
            type: 'SET_SORT',
            payload: e.currentTarget.value,
          });
        }}
      >
        <option value='popularity.desc'>Popularity ⬇</option>
        <option value='popularity.asc'>Popularity ⬆</option>
        <option value='vote_average.desc'>Vote average ⬇</option>
        <option value='vote_average.asc'>Vote average ⬆</option>
        <option value='primary_release_date.desc'>Release Date ⬇</option>
        <option value='primary_release_date.asc'>Release Date ⬆</option>
      </select>
    </div>
  );
});

export default Sorting;
