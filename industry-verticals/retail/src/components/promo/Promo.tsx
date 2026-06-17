import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { Quote } from '@/assets/icons/quote/Quote';
import { CommonStyles, LayoutStyles, PromoFlags } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

type PromoImageGroupProps = Partial<
  Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>
> & {
  withShapes?: boolean;
  withShadows?: boolean;
  diagonalSide?: 'left' | 'right';
};

export type PromoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const PromoContent = ({ ...props }) => {
  const isAccentLineVisible = !props?.params?.styles?.includes(CommonStyles.HideAccentLine);

  return (
    <div className="space-y-5">
      <div className="eyebrow">
        <Text field={props.fields.PromoSubTitle} />
      </div>

      <h2 className="inline-block max-w-lg">
        <Text field={props.fields.PromoTitle} />
        {isAccentLineVisible && <AccentLine className="w-16" />}
      </h2>

      <div className="max-w-lg text-base leading-relaxed">
        <ContentSdkRichText field={props.fields.PromoDescription} />
      </div>

      <Link field={props.fields.PromoMoreInfo} className="main-btn" />
    </div>
  );
};

export const SingleImageContainer = ({
  PromoImageOne,
  withShadows,
  diagonalSide = 'right',
}: PromoImageGroupProps): JSX.Element => {
  const diagonalClass = diagonalSide === 'left' ? 'image-diagonal-left' : 'image-diagonal-right';

  return (
    <div
      className={`relative aspect-4/3 w-full max-w-4xl overflow-hidden ${withShadows ? 'shadow-lg' : ''}`}
    >
      <ContentSdkImage field={PromoImageOne} className={`image-cover ${diagonalClass}`} />
    </div>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = withShadows ? 'shadow-lg' : '';

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="flex flex-col gap-8 md:w-1/3">
        <div className={`relative aspect-square overflow-hidden ${shadowClass}`}>
          <ContentSdkImage field={PromoImageTwo} className="image-cover" />
        </div>
        <div className={`relative aspect-2/3 overflow-hidden ${shadowClass}`}>
          <ContentSdkImage field={PromoImageThree} className="image-cover" />
        </div>
      </div>
      <div className="relative w-full md:w-2/3">
        <div className={`relative aspect-3/2 overflow-hidden ${shadowClass}`}>
          <ContentSdkImage field={PromoImageOne} className="image-cover image-diagonal-right" />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? 'lg:order-last'
    : '';
  const showSingleImage = !props?.params?.styles?.includes(PromoFlags.ShowMultipleImages);
  const withShadows = !props?.params?.styles?.includes(PromoFlags.HidePromoShadows);
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);

  const firstColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-7';
  const secondColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-5';

  return (
    <section className={`${props.params.styles} py-16 lg:py-20`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 place-items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={`${isPromoReversed} col-span-full ${firstColumnSize} relative w-full`}>
          {showSingleImage ? (
            <SingleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              withShadows={withShadows}
              diagonalSide={isReversed ? 'left' : 'right'}
            />
          ) : (
            <MultipleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              PromoImageTwo={props.fields.PromoImageTwo}
              PromoImageThree={props.fields.PromoImageThree}
              withShadows={withShadows}
            />
          )}
        </div>

        <div className={`col-span-full ${secondColumnSize} flex items-center`}>
          <PromoContent {...props} />
        </div>
      </div>
    </section>
  );
};

export const WithFullImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? ' flex-col'
    : 'flex-col-reverse';

  return (
    <section className={`${props.params.styles} py-16 lg:py-20`} id={id ? id : undefined}>
      <div className={`container flex gap-8 ${isPromoReversed}`}>
        <div className="relative aspect-[1232/608] w-full overflow-hidden">
          <ContentSdkImage field={props.fields.PromoImageTwo} className="image-cover" />
        </div>

        <div className="space-y-5">
          <div className="eyebrow">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <h2 className="max-w-md">
              <Text field={props.fields.PromoTitle} />
            </h2>

            <div className="flex max-w-md items-center">
              <ContentSdkRichText className="promo-text" field={props.fields.PromoDescription} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithQuote = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const withQuote = !props?.params?.styles?.includes(PromoFlags.HidePromoQuotes);
  const isReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed);

  const classesWhenReversed = {
    container: isReversed ? 'container-align-left' : 'container-align-right',
    contentOrder: isReversed ? 'order-1 lg:order-2' : 'order-2 lg:order-1',
    imageTransform: isReversed
      ? '-translate-x-[10%] xl:-translate-x-[20%]'
      : 'translate-x-[10%] xl:translate-x-[15%]',
    quoteFlip: isReversed ? '' : 'lg:-scale-x-100',
  };

  return (
    <section
      className={`relative ${props.params.styles} z-10 overflow-hidden pb-16 xl:pb-20`}
      id={id ? id : undefined}
    >
      {withQuote && (
        <div
          className={`absolute left-5 md:top-[10%] lg:top-[25%] lg:left-1/2 lg:-translate-x-1/2 ${classesWhenReversed.quoteFlip} text-accent/20 z-20`}
        >
          <Quote className="h-10 md:h-20 lg:h-25 xl:h-30" />
        </div>
      )}
      <div className="bg-background-muted">
        <div className={`${classesWhenReversed.container}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-0">
            <div
              className={`relative mt-10 flex items-center justify-center lg:col-span-1 ${classesWhenReversed.contentOrder}`}
            >
              <div className="mb-5 max-w-sm px-4">
                <PromoContent {...props} />
              </div>
            </div>

            <div
              className={`relative z-30 order-2 mb-2 aspect-2/1 w-full translate-y-[15%] place-self-end lg:order-1 lg:col-span-2 lg:h-3/4 ${classesWhenReversed.imageTransform}`}
            >
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="image-cover image-diagonal-right absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
