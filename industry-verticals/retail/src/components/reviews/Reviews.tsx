import { ComponentProps } from '@/lib/component-props';
import {
  ComponentParams,
  ComponentRendering,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { ReviewFields } from '@/types/review';
import CarouselButton from '../non-sitecore/CarouselButton';
import ReviewCard from '../non-sitecore/ReviewCard';
import { CommonStyles } from '@/types/styleFlags';

interface ReviewsProps extends ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: {
    Title: TextField;
    Eyebrow: TextField;
    Reviews: ReviewFields[];
  };
}

export const Default = (props: ReviewsProps) => {
  const { page } = useSitecore();

  const id = props.params.RenderingIdentifier;
  const uid = props.rendering.uid;
  const reviews = props.fields?.Reviews || [];
  const sectionTitle = props.fields?.Title || '';
  const sectionEyebrow = props.fields?.Eyebrow || '';
  const styles = `${props.params.styles || ''}`.trim();
  const isPageEditing = page.mode.isEditing;
  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);

  return (
    <div className={`bg-background ${styles}`} id={id}>
      <div className="container py-16 lg:py-20">
        <div className="mb-10 text-center lg:mb-14">
          <p className="eyebrow pb-3">
            <Text field={sectionEyebrow} />
          </p>
          <h2 className="inline-block font-bold" aria-label="section-title">
            <Text field={sectionTitle} />
          </h2>
          {!hideAccentLine && <AccentLine className="mx-auto w-16" />}
        </div>

        <div className="relative px-2">
          <CarouselButton
            direction="prev"
            name="Previous Review"
            aria-label="Previous Review"
            className={`swiper-btn-prev-${uid} absolute top-1/2 -left-2 z-10 -translate-y-1/2`}
          />

          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: `.swiper-btn-prev-${uid}`,
              nextEl: `.swiper-btn-next-${uid}`,
              disabledClass: 'pointer-events-none opacity-50',
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard isPageEditing={isPageEditing} {...review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <CarouselButton
            direction="next"
            name="Next Review"
            aria-label="Next Review"
            className={`swiper-btn-next-${uid} absolute top-1/2 -right-2 z-10 -translate-y-1/2`}
          />
        </div>
      </div>
    </div>
  );
};
