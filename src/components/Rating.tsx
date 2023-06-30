import React, { useContext } from 'react';
import classes from './Rating.module.css';
import { useState } from 'react';
import { MovieContext } from '../Context/MoviesContext';
const Rating = ({
  id,
  myrating,
}: {
  id: number | undefined;
  myrating?: number;
}) => {
  const [setRating, setsetRating] = useState<number>(myrating || 0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const rated = useContext(MovieContext).getRated;
  const stars = [];

  const handleStarHover = (hoveredStar: number) => {
    setHoveredRating(hoveredStar);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const rate = async (movie: number, rating: number) => {
    const sID = sessionStorage.getItem('sID');
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie}/rating?api_key=cbeefb25dae4f9f99bc31cd0e71333f9&guest_session_id=${sID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: rating,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        throw new Error('Failed to send rating.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 0; i < 10; i++) {
    const star = (
      <svg
        height='800px'
        width='800px'
        onMouseEnter={() => {
          handleStarHover(i + 1);
        }}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          console.log(i + 1);
          setsetRating(i + 1);

          rate(id, i + 1);
          setTimeout(() => {
            rated();
          }, 500);
        }}
        key={Math.random() * 1000}
        // className={
        //   i < rating
        //     ? `${classes.star} `
        //     : `${classes.star} ${classes.starEmpty}`
        // }
        className={
          i < setRating || i < hoveredRating
            ? `${classes.star} `
            : `${classes.star} ${classes.starEmpty}`
        }
        // className={`${classes.star} ${classes.starEmpty}`}
        version='1.1'
        id={`${i + 1}`}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 47.94 47.94'
        xmlSpace='preserve'
      >
        <path
          d='M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z'
        />
      </svg>
    );

    stars.push(star);
  }
  return <>{stars}</>;
};

export default Rating;
