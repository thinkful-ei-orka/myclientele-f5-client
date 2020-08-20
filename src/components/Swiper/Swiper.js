import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img src="https://picsum.photos/200/300"/></SwiperSlide>
      <SwiperSlide><img src="https://picsum.photos/200/300"/></SwiperSlide>
      <SwiperSlide><img src="https://picsum.photos/200/300"/></SwiperSlide>
      <SwiperSlide><img src="https://picsum.photos/200/300"/></SwiperSlide>
      ...
    </Swiper>
  );
};