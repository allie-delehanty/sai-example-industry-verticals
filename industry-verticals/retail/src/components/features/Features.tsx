import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  // rendering item id
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields?.data?.datasource?.children?.results || [];
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields?.data?.datasource?.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 py-16 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-20">
        <div className="mb-12 lg:mb-0">
          <h2 className="inline-block max-w-md font-bold">
            {featureSectionTitle?.jsonValue && <Text field={featureSectionTitle.jsonValue} />}
            {!hideAccentLine && <AccentLine className="w-16" />}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item?.featureTitle?.jsonValue;
            const description = item?.featureDescription?.jsonValue;
            const link = item?.featureLink?.jsonValue;
            return (
              <div className="flex flex-col" key={index}>
                <div className="text-foreground mb-3 text-xl font-bold">
                  {title && <Text field={title} />}
                </div>
                <div className="text-foreground-light mb-4 flex-auto text-sm leading-relaxed">
                  {description && <Text field={description} />}
                </div>
                <div>{link && <Link field={link} className="arrow-btn" />}</div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields?.data?.datasource?.children?.results || [];

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage?.jsonValue;
          return (
            <div className="flex items-center justify-center py-6 lg:py-2" key={index}>
              {imageField && (
                <Image field={imageField} className="max-h-16 object-contain opacity-80" />
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields?.data?.datasource?.children?.results || [];

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-16 py-12 md:flex-row lg:gap-16">
        {results.map((item, index) => {
          const title = item?.featureTitle?.jsonValue;
          const description = item?.featureDescription?.jsonValue;
          const image = item?.featureImage?.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-72" key={index}>
              {image && (
                <div className="bg-accent mb-6 flex h-16 w-16 items-center justify-center rounded-sm">
                  <Image field={image} className="brightness-0 invert" />
                </div>
              )}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  {title && (
                    <Text tag="h5" className="text-accent-dark text-center" field={title} />
                  )}
                </div>
                <div className="text-foreground-light text-center text-sm">
                  {description && <Text field={description} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields?.data?.datasource?.children?.results || [];

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-16 md:grid-cols-2 lg:grid-cols-3 lg:py-20">
        {results.map((item, index) => {
          const title = item?.featureTitle?.jsonValue;
          const description = item?.featureDescription?.jsonValue;
          return (
            <div
              className="group hover:bg-accent hover:border-accent cursor-pointer rounded-sm border border-transparent p-6 transition-colors"
              key={index}
            >
              <h1 className="text-accent/30 group-hover:text-background/40 mb-2 text-6xl leading-none font-bold">
                {generateIndexes(index)}
              </h1>
              <div>
                <div className="text-accent-dark group-hover:text-background mb-3 text-xl leading-snug font-bold">
                  {title && <Text field={title} />}
                </div>
                <div className="text-foreground-light group-hover:text-background/90 text-sm leading-relaxed">
                  {description && <Text field={description} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields?.data?.datasource?.children?.results || [];

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-20">
        {results.map((item, index) => {
          const title = item?.featureTitle?.jsonValue;
          const description = item?.featureDescription?.jsonValue;
          const image = item?.featureImage?.jsonValue;
          return (
            <div className="grid grid-cols-[auto_1fr] gap-4" key={index}>
              {image && (
                <div className="bg-accent-soft flex size-12 items-center justify-center rounded-sm">
                  <Image field={image} className="max-h-7 max-w-7 object-contain" />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <div className="text-base leading-snug font-bold">
                  {title && <Text className="text-accent-dark" field={title} />}
                </div>
                <div className="text-foreground-light mt-1 text-sm leading-relaxed">
                  {description && <Text field={description} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields?.data?.datasource?.children?.results || [];

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-10 py-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:py-16">
        {results.map((item, index) => {
          const title = item?.featureTitle?.jsonValue;
          const description = item?.featureDescription?.jsonValue;
          const image = item?.featureImage?.jsonValue;
          const link = item?.featureLink?.jsonValue;
          return (
            <div key={index} className="group flex flex-col">
              {image && (
                <div className="bg-background-surface mb-5 aspect-[16/10] w-full overflow-hidden rounded-sm">
                  <Image
                    field={image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <h3 className="text-foreground text-xl font-bold">
                {title && <Text field={title} />}
              </h3>

              <p className="text-foreground-light mt-2 flex-auto text-sm leading-relaxed">
                {description && <Text field={description} />}
              </p>

              {link && (
                <div className="mt-4">
                  <Link field={link} className="arrow-btn" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
