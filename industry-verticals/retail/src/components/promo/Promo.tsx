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
import clsx from 'clsx';
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
};

export type PromoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const isShadowClassActive = (val: boolean) => (val ? 'shadow-xl' : '');

export const PromoContent = ({ ...props }) => {
  const isAccentLineVisible = !props?.params?.styles?.includes(CommonStyles.HideAccentLine);

  return (
    <div className="space-y-5">
      <div className="eyebrow-badge">
        <Text field={props.fields.PromoSubTitle} />
      </div>

      <h2 className="inline-block max-w-md tracking-tight">
        <Text field={props.fields.PromoTitle} />
        {isAccentLineVisible && <AccentLine className="w-full max-w-[5ch]" />}
      </h2>

      <div className="max-w-lg text-base leading-relaxed md:text-lg">
        <ContentSdkRichText field={props.fields.PromoDescription} />
      </div>

      <Link field={props.fields.PromoMoreInfo} className="arrow-btn" />
    </div>
  );
};

export const SingleImageContainer = ({
  PromoImageOne,
  withShapes,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  return (
    <>
      {withShapes && (
        <div className="bg-brand-green absolute top-0 left-0 z-0 aspect-6/5 w-2/3 rounded-[2rem]"></div>
      )}
      <div>
        <div className={clsx({ 'm-4 md:m-9 md:mb-6 xl:m-15 xl:mb-8': withShapes })}>
          {withShapes && (
            <div className="bg-accent absolute top-1/2 right-0 z-0 aspect-5/3 w-3/4 -translate-y-1/2 transform rounded-[2rem]"></div>
          )}
          <div
            className={`relative z-10 aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl ${shadowClass}`}
          >
            <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShapes,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  const marginClass = withShapes ? 'mr-4' : '';

  return (
    <>
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex flex-col gap-10 md:w-1/3">
          <div className="relative aspect-square overflow-visible rounded-2xl">
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage field={PromoImageTwo} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="relative aspect-2/3 overflow-visible rounded-2xl">
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage field={PromoImageThree} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-2/3">
          {withShapes && (
            <div className="bg-brand-green absolute right-0 z-0 aspect-[495/422] w-3/4 rounded-[2rem] md:-top-10 xl:-top-15"></div>
          )}
          <div className={`relative aspect-3/2 overflow-visible rounded-2xl ${marginClass} z-10`}>
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage
                field={PromoImageOne}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? ''
    : 'order-last';
  const showSingleImage = !props?.params?.styles?.includes(PromoFlags.ShowMultipleImages);
  const withShapes = !props?.params?.styles?.includes(PromoFlags.HidePromoShapes);
  const withShadows = !props?.params?.styles?.includes(PromoFlags.HidePromoShadows);

  const justifyContentClass = !showSingleImage ? 'justify-self-start' : '';
  const firstColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-7';
  const secondColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-5';

  return (
    <section className={`${props.params.styles} py-16 md:py-24`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 place-items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={`${isPromoReversed} col-span-full ${firstColumnSize} relative w-full`}>
          {showSingleImage ? (
            <SingleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          ) : (
            <MultipleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              PromoImageTwo={props.fields.PromoImageTwo}
              PromoImageThree={props.fields.PromoImageThree}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          )}
        </div>

        <div className={`col-span-full ${secondColumnSize} ${justifyContentClass}`}>
          <PromoContent {...props} />
        </div>
      </div>
    </section>
  );
};

export const WithFullImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? ' flex-col'
    : 'flex-col-reverse';

  return (
    <section className={`${props.params.styles} py-16 md:py-24`} id={id ? id : undefined}>
      <div className={`container flex ${isPromoReversed} gap-8`}>
        <div className="relative my-6 aspect-[1232/608] overflow-hidden rounded-2xl">
          <ContentSdkImage
            field={props.fields.PromoImageTwo}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="eyebrow-badge">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <div className="grid-col-1 grid gap-5 md:grid-cols-2 md:gap-10">
            <div className="font-bold">
              <h2 className="max-w-md tracking-tight">
                <Text field={props.fields.PromoTitle} />
              </h2>
            </div>

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
      className={`relative ${props.params.styles} z-10 overflow-hidden pb-15 xl:pb-[4%]`}
      id={id ? id : undefined}
    >
      {withQuote && (
        <div
          className={`absolute left-5 md:top-[10%] lg:top-[25%] lg:left-1/2 lg:-translate-x-1/2 ${classesWhenReversed.quoteFlip} text-accent! z-20`}
        >
          <Quote className="h-10 md:h-20 lg:h-25 xl:h-30" />
        </div>
      )}
      <div className="bg-background">
        <div className={`${classesWhenReversed.container} `}>
          <div className={`grid grid-cols-1 lg:grid-cols-3 lg:gap-0`}>
            <div
              className={`relative mt-10 flex items-center justify-center lg:col-span-1 ${classesWhenReversed.contentOrder}`}
            >
              <div className="text-foreground! mb-5 max-w-sm">
                <PromoContent {...props} />
              </div>
            </div>

            <div
              className={`relative z-30 order-2 mb-2 aspect-2/1 w-full translate-y-[25%] scale-100 place-self-end lg:order-1 lg:col-span-2 lg:h-3/4 xl:scale-90 ${classesWhenReversed.imageTransform}`}
            >
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * FeatureCard — GoTo “featured highlights” card: media, yellow pill tag, title, body, text CTA.
 */
export const FeatureCard = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);

  return (
    <section className={`${props.params.styles} py-10 md:py-14`} id={id ? id : undefined}>
      <div className="container">
        <article
          className={clsx(
            'border-border bg-background grid overflow-hidden rounded-2xl border',
            'lg:grid-cols-2',
            isReversed && 'lg:[&>div:first-child]:order-2'
          )}
        >
          <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[22rem]">
            <div className="bg-brand-green absolute inset-0 opacity-90" aria-hidden="true" />
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-luminosity"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 md:p-10 lg:p-12">
            <div className="eyebrow-badge w-fit">
              <Text field={props.fields.PromoSubTitle} />
            </div>
            <h2 className="text-2xl tracking-tight md:text-3xl lg:text-4xl">
              <Text field={props.fields.PromoTitle} />
            </h2>
            <div className="text-foreground-light max-w-md text-base leading-relaxed">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <div className="pt-2">
              <Link field={props.fields.PromoMoreInfo} className="arrow-btn" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

/**
 * ProductSpotlight — GoTo Connect product block: green top bar media + side copy with one CTA.
 */
export const ProductSpotlight = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);

  return (
    <section
      className={`${props.params.styles} relative overflow-hidden py-16 md:py-24`}
      id={id ? id : undefined}
    >
      <div
        aria-hidden="true"
        className="goto-blob-green absolute -bottom-32 -left-24 size-72 opacity-80 lg:size-96"
      />
      <div
        aria-hidden="true"
        className="bg-accent absolute -top-20 -right-16 z-0 h-56 w-56 rotate-45 lg:h-72 lg:w-72"
      />

      <div className="relative z-10 container">
        <div
          className={clsx(
            'grid items-center gap-10 lg:grid-cols-2 lg:gap-14',
            isReversed && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
          )}
        >
          <div className="border-border bg-background relative overflow-hidden rounded-2xl border shadow-sm">
            <div className="bg-brand-green h-2 w-full" aria-hidden="true" />
            <div className="bg-background-surface relative aspect-[16/10]">
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="eyebrow">
              <Text field={props.fields.PromoSubTitle} />
            </div>
            <h2 className="max-w-md text-3xl tracking-tight md:text-4xl lg:text-5xl">
              <Text field={props.fields.PromoTitle} />
            </h2>
            <div className="text-foreground-light max-w-md text-lg">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <Link field={props.fields.PromoMoreInfo} className="main-btn mt-2 w-auto! px-7" />
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * TextLead — copy-first promo (text left / image right by default).
 * Same fields as Default; ideal for demonstrating orientation variants in SitecoreAI.
 */
export const TextLead = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);
  const showSingleImage = !props?.params?.styles?.includes(PromoFlags.ShowMultipleImages);
  const withShapes = !props?.params?.styles?.includes(PromoFlags.HidePromoShapes);
  const withShadows = !props?.params?.styles?.includes(PromoFlags.HidePromoShadows);

  return (
    <section className={`${props.params.styles} py-16 md:py-24`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={clsx('col-span-full lg:col-span-5', isPromoReversed && 'lg:order-2')}>
          <PromoContent {...props} />
        </div>

        <div
          className={clsx(
            'relative col-span-full w-full lg:col-span-7',
            isPromoReversed && 'lg:order-1'
          )}
        >
          {showSingleImage ? (
            <SingleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          ) : (
            <MultipleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              PromoImageTwo={props.fields.PromoImageTwo}
              PromoImageThree={props.fields.PromoImageThree}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * DarkBand — GoTo homepage product lane: black panel, yellow slash, image + CTA.
 */
export const DarkBand = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);
  const hideAccentLine = props?.params?.styles?.includes(CommonStyles.HideAccentLine);

  return (
    <section
      className={`${props.params.styles} relative overflow-hidden py-16 md:py-24`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div
          className={clsx(
            'bg-foreground text-background relative grid items-center gap-10 overflow-hidden rounded-2xl px-6 py-12 sm:px-10 md:py-16 lg:grid-cols-2 lg:gap-14 lg:px-14',
            isReversed && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
          )}
        >
          <div
            aria-hidden="true"
            className="goto-slash absolute top-0 right-[42%] z-0 hidden h-full w-14 opacity-90 lg:block"
          />
          <div
            aria-hidden="true"
            className="goto-blob-green absolute -right-16 -bottom-24 z-0 size-64 opacity-80 lg:size-80"
          />

          <div className="relative z-10 space-y-5">
            <div className="eyebrow-badge border-background/20 bg-background/10 text-background">
              <Text field={props.fields.PromoSubTitle} />
            </div>
            <h2 className="text-background max-w-md text-3xl tracking-tight md:text-4xl lg:text-5xl">
              <Text field={props.fields.PromoTitle} />
              {!hideAccentLine && <AccentLine className="mt-2 !h-3 w-[5ch]" />}
            </h2>
            <div className="text-background/75 max-w-md text-base leading-relaxed md:text-lg [&_*]:text-inherit">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <div className="pt-2">
              <Link
                field={props.fields.PromoMoreInfo}
                className="main-btn-accent inline-flex w-auto! min-w-40 px-7"
              />
            </div>
          </div>

          <div className="relative z-10">
            <div className="ring-background/15 aspect-[16/11] overflow-hidden rounded-2xl shadow-2xl ring-1">
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * StatCallout — social-proof / claim strip.
 * PromoSubTitle = label, PromoTitle = big claim/number, PromoDescription = support copy.
 */
export const StatCallout = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed);

  return (
    <section className={`${props.params.styles} py-14 md:py-20`} id={id ? id : undefined}>
      <div className="container">
        <div
          className={clsx(
            'border-border grid items-center gap-8 border-y py-10 md:gap-12 md:py-14 lg:grid-cols-12',
            isReversed && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
          )}
        >
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">
              <Text field={props.fields.PromoSubTitle} />
            </div>
            <p className="text-5xl leading-none font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              <Text field={props.fields.PromoTitle} />
            </p>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div className="text-foreground-light max-w-xl text-lg leading-relaxed md:text-xl">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <Link field={props.fields.PromoMoreInfo} className="arrow-btn" />
          </div>
        </div>
      </div>
    </section>
  );
};
