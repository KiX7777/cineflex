// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './ImageGalery.css';

// import required modules
import { Navigation } from 'swiper';
import Vote from './Vote';

export default function ImageGallery({
  images,
  title,
  overview,
  videos,
  rating,
}: {
  images: string[];
  videos?: string[];
  title: string;
  overview: string;
  rating: number;
}) {
  console.log(images);
  const imageSlides = images.map((i) => (
    <SwiperSlide key={i}>
      <img src={i} />
      <span className='overview'>{overview}</span>
      <span className='blur'></span>
    </SwiperSlide>
  ));

  const videoSlides = videos?.map((v) => (
    <SwiperSlide key={v}>
      <iframe
        className='yt'
        width='560'
        height='315'
        src={`https://www.youtube-nocookie.com/embed/${v}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
    </SwiperSlide>
  ));

  return (
    <>
      {images.length > 0 ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          loop
          className='mySwiper'
        >
          <h1>{title}</h1>
          <Vote rating={rating} />
          {imageSlides}
          {videoSlides}
        </Swiper>
      ) : (
        <div className='fallback'>
          <img
            className={'noImg'}
            src='../src/assets/picture-not-available.webp'
            alt='picture not available'
          />
          <h1>{title}</h1>
          <Vote rating={rating} />
        </div>
      )}
    </>
  );
}
