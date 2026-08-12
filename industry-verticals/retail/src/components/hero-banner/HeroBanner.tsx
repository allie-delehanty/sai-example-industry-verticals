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
  SecondaryCtaLink?: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const EMPTY_LINK_FIELD: LinkField = { value: {} };

const hasSecondaryCta = (fields?: Fields) => Boolean(fields?.SecondaryCtaLink?.value?.href);

/** Sitecore <Link> requires a defined field; fall back when SecondaryCtaLink is absent. */
const getSecondaryCtaField = (fields?: Fields): LinkField =>
  fields?.SecondaryCtaLink ?? EMPTY_LINK_FIELD;

const HeroBannerCommon = ({
  params,
  fields,
  children,
  className,
}: HeroBannerProps & {
  children: React.ReactNode;
  className?: string;
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
    <div
      className={clsx(
        `component hero-banner ${styles} relative flex items-center overflow-hidden`,
        className
      )}
      id={id}
    >
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
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
        {/* Fade to page background */}
        {!hideGradientOverlay && (
          <div className="to-background absolute inset-0 bg-gradient-to-b from-transparent from-70%"></div>
        )}
      </div>

      {children}
    </div>
  );
};

/** Default — side-aligned content over media (GoTo product-hero cadence) */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-[32rem] w-full py-16 lg:min-h-[40rem] lg:w-1/2 lg:items-center lg:py-24 ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-xl">
              <div className={clsx({ shim: screenLayer }, 'rounded-2xl')}>
                <h1 className="text-left text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="!h-3 w-[6ch]" />}
                </h1>

                <div className="mt-6 text-lg md:text-xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-foreground-light text-left"
                  />
                </div>

                <div className="mt-8 flex w-full flex-wrap items-center justify-start gap-3">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="main-btn w-auto! min-w-44 px-8" />
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

/** TopContent — centered stacked hero */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-[32rem] justify-center px-4 lg:min-h-[40rem]">
          <div
            className={`flex flex-col items-center py-16 lg:py-28 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer }, 'max-w-3xl rounded-2xl')}>
              <h1 className="text-center text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-3 w-[6ch]" />}
              </h1>

              <div className="mt-6 text-lg md:text-xl">
                <ContentSdkRichText
                  field={fields.Description}
                  className="text-foreground-light text-center"
                />
              </div>

              <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="main-btn w-auto! min-w-44 px-8" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

/**
 * Shared Brand hero layout — dark (white text) or light (black text). Colors only differ.
 */
const BrandHero = ({
  params,
  fields,
  rendering,
  theme,
}: HeroBannerProps & { theme: 'dark' | 'light' }) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const isDark = theme === 'dark';

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={params.RenderingIdentifier}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={clsx(
        `component hero-banner brand-block ${styles} relative overflow-hidden`,
        isDark ? 'bg-foreground text-background' : 'bg-background text-foreground'
      )}
      id={params.RenderingIdentifier}
    >
      {/* Graphic language */}
      <div
        aria-hidden="true"
        className="goto-slash absolute -top-10 -right-8 z-0 h-[120%] w-16 opacity-90 sm:w-24 lg:right-[38%] lg:w-28"
      />
      <div
        aria-hidden="true"
        className="goto-blob-green absolute -bottom-24 -left-16 z-0 size-64 opacity-90 sm:size-80 lg:size-96"
      />

      <div className="relative z-10">
        <div
          className={clsx(
            'container grid items-center gap-10 py-16 lg:min-h-[36rem] lg:grid-cols-2 lg:gap-12 lg:py-24',
            reverseLayout && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
          )}
        >
          <div className="max-w-xl">
            <h1
              className={clsx(
                'text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl',
                isDark ? 'text-background' : 'text-foreground'
              )}
            >
              <ContentSdkText field={fields.Title} />
              {!hideAccentLine && <AccentLine className="!h-3 w-[5ch]" />}
            </h1>
            <div
              className={clsx(
                'mt-6 text-lg md:text-xl [&_*]:text-inherit',
                isDark ? 'text-background/80' : 'text-foreground-light'
              )}
            >
              <ContentSdkRichText field={fields.Description} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <>
                  <Link
                    field={fields.CtaLink}
                    className={clsx(
                      'inline-flex w-auto! min-w-40 px-7',
                      isDark ? 'main-btn-accent' : 'main-btn'
                    )}
                  />
                  {(hasSecondaryCta(fields) || isPageEditing) && (
                    <Link
                      field={getSecondaryCtaField(fields)}
                      className={clsx(
                        'inline-flex w-auto! min-w-36 px-7',
                        isDark
                          ? 'main-btn-outline border-background text-background hover:bg-background hover:text-foreground'
                          : 'main-btn-outline'
                      )}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div className="relative">
            <div
              className={clsx(
                'relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1',
                isDark ? 'ring-background/10' : 'ring-foreground/10'
              )}
            >
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
                <ContentSdkImage
                  field={fields.Image}
                  className="h-full w-full object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * BrandBlock — dark background, white text (GoTo dark marketing hero).
 */
export const BrandBlock = (props: HeroBannerProps) => <BrandHero {...props} theme="dark" />;

/**
 * BrandLight — light background, black text (color inverse of BrandBlock).
 */
export const BrandLight = (props: HeroBannerProps) => <BrandHero {...props} theme="light" />;

/**
 * YellowSplash — expressive yellow hero matching GoTo “Grow your business” moments.
 */
export const YellowSplash = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={params.RenderingIdentifier}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner yellow-splash ${styles} bg-accent text-foreground relative overflow-hidden`}
      id={params.RenderingIdentifier}
    >
      {/* Primary yellow + gray graphic language only (no second secondary) */}
      <div
        aria-hidden="true"
        className="goto-slash absolute top-0 right-[12%] z-0 h-full w-14 opacity-90 sm:w-20"
      />
      <div
        aria-hidden="true"
        className="bg-brand-gray-4 absolute -bottom-24 -left-20 z-0 size-72 rounded-full sm:size-96"
      />
      <div
        aria-hidden="true"
        className="bg-background/35 absolute top-1/4 right-[8%] z-0 hidden size-36 rounded-full lg:block"
      />

      <div className="relative z-10">
        <div className="container flex min-h-[28rem] flex-col items-start justify-center gap-8 py-20 text-left lg:min-h-[32rem] lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <ContentSdkText field={fields.Title} />
              {!hideAccentLine && <AccentLine className="!text-foreground !h-3 w-[5ch]" />}
            </h1>
            <div className="text-foreground/80 mt-6 text-lg md:text-xl [&_*]:text-inherit">
              <ContentSdkRichText field={fields.Description} />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <>
                  <Link field={fields.CtaLink} className="main-btn w-auto! min-w-44 px-8" />
                  {(hasSecondaryCta(fields) || isPageEditing) && (
                    <Link
                      field={getSecondaryCtaField(fields)}
                      className="main-btn-outline bg-background/80 w-auto! min-w-36 px-8"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {(fields.Image?.value?.src || isPageEditing) && (
            <div className="relative mt-4 w-full max-w-4xl">
              <div className="ring-foreground/10 aspect-[16/9] overflow-hidden rounded-2xl shadow-xl ring-1">
                <ContentSdkImage
                  field={fields.Image}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * LeftMedia — classic GoTo product-page hero: left copy stack + dual CTAs over full-bleed media.
 * Default keeps content on the left; Reversed style flips it to the right.
 */
export const LeftMedia = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <HeroBannerCommon
      params={params}
      fields={fields}
      rendering={rendering}
      className="min-h-[34rem] lg:min-h-[42rem]"
    >
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div
            className={clsx(
              'flex min-h-[34rem] w-full items-center py-16 lg:min-h-[42rem] lg:w-[52%] lg:py-24',
              reverseLayout ? 'lg:ml-auto lg:justify-end' : 'lg:mr-auto lg:justify-start'
            )}
          >
            <div className={clsx({ shim: screenLayer }, 'max-w-xl rounded-2xl')}>
              <h1 className="text-left text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="!h-3 w-[6ch]" />}
              </h1>

              <div className="mt-6 text-lg md:text-xl">
                <ContentSdkRichText
                  field={fields.Description}
                  className="text-foreground-light text-left"
                />
              </div>

              <div className="mt-8 flex w-full flex-wrap items-center justify-start gap-3">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <>
                    <Link field={fields.CtaLink} className="main-btn w-auto! min-w-44 px-8" />
                    {(hasSecondaryCta(fields) || isPageEditing) && (
                      <Link
                        field={getSecondaryCtaField(fields)}
                        className="main-btn-outline bg-background/85 w-auto! min-w-36 px-8"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

/**
 * SplitBand — dark branded left column + full-bleed media on the right.
 * Strong toggle vs BrandBlock (graphic) and Default (overlay).
 */
export const SplitBand = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={params.RenderingIdentifier}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner split-band ${styles} relative overflow-hidden`}
      id={params.RenderingIdentifier}
    >
      <div
        className={clsx(
          'grid min-h-[34rem] lg:min-h-[40rem] lg:grid-cols-2',
          reverseLayout && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
        )}
      >
        <div className="bg-foreground text-background relative flex items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
          <div
            aria-hidden="true"
            className="goto-slash absolute top-0 right-8 z-0 h-full w-12 opacity-90 sm:w-16"
          />
          <div
            aria-hidden="true"
            className="goto-blob-green absolute -bottom-28 -left-20 z-0 size-64 opacity-80 sm:size-80"
          />

          <div className="relative z-10 max-w-xl">
            <h1 className="text-background text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <ContentSdkText field={fields.Title} />
              {!hideAccentLine && <AccentLine className="!h-3 w-[5ch]" />}
            </h1>
            <div className="text-background/80 mt-6 text-lg md:text-xl [&_*]:text-inherit">
              <ContentSdkRichText field={fields.Description} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <>
                  <Link
                    field={fields.CtaLink}
                    className="main-btn-accent inline-flex w-auto! min-w-40 px-7"
                  />
                  {(hasSecondaryCta(fields) || isPageEditing) && (
                    <Link
                      field={getSecondaryCtaField(fields)}
                      className="main-btn-outline border-background text-background hover:bg-background hover:text-foreground inline-flex w-auto! min-w-36 px-7"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative min-h-[18rem] lg:min-h-full">
          {!isPageEditing && fields?.Video?.value?.src ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={fields.Image?.value?.src}
            >
              <source src={fields.Video?.value?.src} type="video/webm" />
            </video>
          ) : (
            <ContentSdkImage
              field={fields.Image}
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
};
