import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import YouTube from 'react-youtube';

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
  videos,
}: {
  images: string[];
  videos?: string[];
  title: string;
  overview: string;
}) {
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
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop
        className='mySwiper'
      >
        <h1>{title}</h1>
        {imageSlides}
        {videoSlides}
      </Swiper>
    </>
  );
}
