import { Swiper, SwiperSlide } from 'swiper/react';

import BoardCard from './BoardCard';

import 'swiper/css';

export default function BoardCardListSwiper({ data }: { data: any[] }) {
  return (
    <Swiper slidesPerView="auto" spaceBetween={16} className="-my-5 !p-5">
      {data.map((item) => (
        <SwiperSlide key={item.id} className="!w-[250px]">
          <BoardCard
            id={item.id}
            image={item.image}
            updatedAt={item.updatedAt}
            title={item.title}
            name={item.writer.name}
            likeCount={item.likeCount}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
