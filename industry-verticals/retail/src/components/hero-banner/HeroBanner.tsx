import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroCurve = () => (
  <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 overflow-hidden leading-none">
    <svg
      viewBox="0 0 1440 80"
      className="text-background h-10 w-full md:h-14 lg:h-20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d="M0,80 C360,8 1080,8 1440,80 L1440,80 L0,80 Z" />
    </svg>
  </div>
);

const getHeroCopyClasses = (screenLayer: boolean) => ({
  title: screenLayer
    ? 'text-foreground'
    : 'text-primary-foreground drop-shadow-[0_2px_8px_rgba(73,38,135,0.7)]',
  description: screenLayer
    ? 'text-foreground-light [&_p]:text-inherit'
    : 'text-primary-foreground/95 [&_p]:text-inherit drop-shadow-[0_1px_6px_rgba(73,38,135,0.6)]',
});

const HeroBannerCommon = ({
  params,
  fields,
  children,
  withCurve = false,
}: HeroBannerProps & {
  children: React.ReactNode;
  withCurve?: boolean;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover md:object-center"
              priority
            />
          </>
        )}
        {/* Gradient overlay to fade image/video at bottom */}
        {!hideGradientOverlay && (
          <div className="from-primary/70 via-primary/35 to-primary/80 absolute inset-0 bg-gradient-to-b"></div>
        )}
      </div>

      {children}
      {withCurve && <HeroCurve />}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const copyClasses = getHeroCopyClasses(screenLayer);

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering} withCurve>
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[28rem] w-full items-center py-16 md:min-h-[36rem] lg:min-h-[40rem] ${reverseLayout ? 'justify-start' : 'justify-center'}`}
          >
            <div className={clsx('max-w-3xl text-center', { shim: screenLayer })}>
              <h1
                className={clsx(
                  'text-4xl leading-[1.15] font-bold md:text-6xl lg:text-7xl',
                  copyClasses.title
                )}
              >
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto" />}
              </h1>

              <div className={clsx('mt-6 text-lg md:text-xl', copyClasses.description)}>
                <ContentSdkRichText
                  field={fields.Description}
                  className={copyClasses.description}
                />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="gold-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const copyClasses = getHeroCopyClasses(screenLayer);

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[18rem] flex-col items-start justify-end py-12 md:min-h-[22rem] md:flex-row md:items-end md:justify-between md:py-16 ${reverseLayout ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={clsx('max-w-xl', { shim: screenLayer })}>
              <h1
                className={clsx(
                  'text-4xl leading-[1.15] font-bold md:text-5xl lg:text-6xl',
                  copyClasses.title
                )}
              >
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine />}
              </h1>
              <div className={clsx('mt-4 text-lg', copyClasses.description)}>
                <ContentSdkRichText field={fields.Description} />
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link field={fields.CtaLink} className="ghost-btn-light" />
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const Editorial = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const copyClasses = getHeroCopyClasses(screenLayer);

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[24rem] w-full py-12 md:min-h-[32rem] lg:w-1/2 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className={clsx('max-w-xl', { shim: screenLayer })}>
              <h1
                className={clsx(
                  'text-4xl leading-[1.15] font-bold md:text-5xl lg:text-6xl',
                  copyClasses.title
                )}
              >
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine />}
              </h1>

              <div className={clsx('mt-6 text-lg md:text-xl', copyClasses.description)}>
                <ContentSdkRichText field={fields.Description} />
              </div>

              <div className="mt-8 flex w-full">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="gold-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
