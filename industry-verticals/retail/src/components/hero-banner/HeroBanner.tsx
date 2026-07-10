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
import { HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
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

const HeroBannerCommon = ({
  params,
  fields,
  children,
  reverseLayout = false,
}: HeroBannerProps & {
  children: React.ReactNode;
  reverseLayout?: boolean;
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
        {/* ATCC: purple wash sits behind the copy (right by default, left when reversed) */}
        {!hideGradientOverlay && (
          <>
            <div
              className={clsx(
                'max-lg:from-accent-dark/85 max-lg:via-accent-dark/50 max-lg:to-accent-dark/20 absolute inset-0 max-lg:bg-gradient-to-t',
                reverseLayout
                  ? 'lg:from-accent-dark/80 lg:via-accent-dark/45 lg:bg-gradient-to-r lg:to-transparent'
                  : 'lg:from-accent-dark/80 lg:via-accent-dark/45 lg:bg-gradient-to-l lg:to-transparent'
              )}
            />
          </>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon
      params={params}
      fields={fields}
      rendering={rendering}
      reverseLayout={reverseLayout}
    >
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[26rem] w-full py-14 md:min-h-[32rem] lg:w-[48%] lg:items-center lg:py-20 ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-lg">
              <div className={clsx({ shim: screenLayer })}>
                <h1 className="text-center text-3xl leading-[1.15] font-bold text-white normal-case md:text-4xl lg:text-left lg:text-[2.75rem] xl:text-5xl">
                  <ContentSdkText field={fields.Title} />
                </h1>

                <div className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-center lg:text-left [&_*]:!text-white/90"
                  />
                </div>

                <div className="mt-8 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="soft-btn" />
                  )}
                </div>
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
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon
      params={params}
      fields={fields}
      rendering={rendering}
      reverseLayout={reverseLayout}
    >
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-[26rem] justify-center px-4 md:min-h-[32rem]">
          <div
            className={`flex flex-col items-center py-14 lg:py-24 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx('max-w-2xl', { shim: screenLayer })}>
              <h1 className="text-center text-3xl leading-[1.15] font-bold text-white normal-case md:text-4xl xl:text-5xl">
                <ContentSdkText field={fields.Title} />
              </h1>

              <div className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
                <ContentSdkRichText
                  field={fields.Description}
                  className="text-center [&_*]:!text-white/90"
                />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="soft-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
