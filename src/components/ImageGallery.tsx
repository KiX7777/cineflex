import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './ImageGalery.css';

// import required modules
import { Navigation } from 'swiper';

export default function ImageGallery({
  images,
  title,
  overview,
}: {
  images: string[];
  title: string;
  overview: string;
}) {
  const slides = images.map((i) => (
    <SwiperSlide key={i}>
      <img src={i} />
      <span className='overview'>{overview}</span>
      <span className='blur'></span>
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop
        className='mySwiper'
      >
        <h1>{title}</h1>
        {slides}
      </Swiper>
    </>
  );
}
