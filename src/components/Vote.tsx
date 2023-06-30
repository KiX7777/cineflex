import React from 'react';
import classes from './Vote.module.css';

const Vote = ({ rating }: { rating: number | undefined }) => {
  const getClassByRate = (vote: number): string => {
    if (vote >= 8) {
      return `${classes.green} ${classes.vote}`;
    } else if (vote >= 5) {
      return `${classes.orange} ${classes.vote}`;
    } else {
      return `${classes.red} ${classes.vote}`;
    }
  };

  return <span className={getClassByRate(rating as number)}>{rating}</span>;
};

export default Vote;
