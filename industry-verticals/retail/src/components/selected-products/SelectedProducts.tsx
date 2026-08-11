import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, LinkField, Link } from '@sitecore-content-sdk/nextjs';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import ProductCarousel from '../non-sitecore/ProductCarousel';
import { SitecoreItem } from '@/types/common';
import { Product } from '@/types/products';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  Title: Field<string>;
  ProductsLink: LinkField;
  ProductsList: SitecoreItem<Product>[];
}

interface RelatedProductsProps extends ComponentProps {
  fields: Fields;
}

export const Default = (props: RelatedProductsProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const hideAccentLine = props?.params?.styles?.includes(CommonStyles.HideAccentLine);
  const autoPlay = isParamEnabled(props.params.Autoplay);
  const loop = isParamEnabled(props.params.Loop);

  return (
    <section className={`component related-products ${styles}`} id={id || undefined}>
      <div className="container flex flex-col items-start p-8 md:p-10">
        <h2 className="mb-10 inline-block text-left tracking-tight">
          <Text field={props.fields?.Title} />
          {!hideAccentLine && <AccentLine className="!h-3 w-[5ch]" />}
        </h2>

        {/* Product Carousel */}
        <div className="w-full">
          <ProductCarousel products={props.fields.ProductsList} autoPlay={autoPlay} loop={loop} />
        </div>

        <Link field={props.fields.ProductsLink} className="arrow-btn mt-8" />
      </div>
    </section>
  );
};
