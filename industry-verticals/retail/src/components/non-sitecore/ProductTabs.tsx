import { useState } from 'react';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ProductReviews } from './ProductReviews';

interface ProductTabsProps {
  product: Product;
  isPageEditing: boolean;
  dynamicPlaceholderId: string;
  rendering: ComponentRendering;
}

export const ProductTabs = ({ product, isPageEditing, rendering }: ProductTabsProps) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'description' | 'dimension' | 'reviews'>(
    'description'
  );

  const tabBase = 'border-b-2 pb-2 transition text-md sm:text-xl font-semibold';
  const tabActive = 'border-foreground text-foreground';
  const tabInactive = 'text-foreground-muted border-transparent';

  const hasDimensions = Boolean(
    product?.Width?.value ||
    product?.Height?.value ||
    product?.Depth?.value ||
    product?.Weight?.value ||
    product?.SeatHeight?.value ||
    product?.LegHeight?.value
  );

  return (
    <div className="bg-background-muted mt-12 py-10 md:mt-16 md:py-14">
      <div className="container flex w-full flex-col items-start">
        <div className="mb-6 flex w-full flex-wrap justify-start gap-4 text-base sm:gap-10 sm:text-xl">
          <button
            className={`${tabBase} ${activeTab === 'description' ? tabActive : tabInactive}`}
            onClick={() => setActiveTab('description')}
          >
            {t('description_tab_label') || 'Features'}
          </button>
          <button
            className={`${tabBase} ${activeTab === 'dimension' ? tabActive : tabInactive}`}
            onClick={() => setActiveTab('dimension')}
          >
            {t('dimensions_tab_label') || 'Specs'}
          </button>
          <button
            className={`${tabBase} ${activeTab === 'reviews' ? tabActive : tabInactive}`}
            onClick={() => setActiveTab('reviews')}
          >
            {t('reviews_tab_label') || 'Customers'}
          </button>
        </div>

        <div className="w-full max-w-4xl py-2 text-left text-sm sm:text-base">
          <div className={activeTab === 'description' ? '' : 'hidden'}>
            {product?.LongDescription?.value || isPageEditing ? (
              <ContentSdkRichText
                field={product.LongDescription}
                className="[&_p]:text-foreground-light max-w-none text-left"
              />
            ) : (
              <p className="text-foreground-muted">
                {t('no_description_text') || 'No features available'}
              </p>
            )}
          </div>

          <div className={activeTab === 'dimension' ? '' : 'hidden'}>
            <div className="w-full max-w-md">
              <dl className="text-foreground-light grid grid-cols-2 gap-x-4 gap-y-3 text-left">
                {(product?.Width?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">{t('width_label') || 'Width'}</dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.Width} />
                    </dd>
                  </>
                )}

                {(product?.Height?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">
                      {t('height_label') || 'Height'}
                    </dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.Height} />
                    </dd>
                  </>
                )}

                {(product?.Depth?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">{t('depth_label') || 'Depth'}</dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.Depth} />
                    </dd>
                  </>
                )}

                {(product?.Weight?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">
                      {t('weight_label') || 'Weight'}
                    </dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.Weight} />
                    </dd>
                  </>
                )}

                {(product?.SeatHeight?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">
                      {t('seat_height_label') || 'Seat Height'}
                    </dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.SeatHeight} />
                    </dd>
                  </>
                )}

                {(product?.LegHeight?.value || isPageEditing) && (
                  <>
                    <dt className="text-foreground font-semibold">
                      {t('leg_height_label') || 'Leg Height'}
                    </dt>
                    <dd className="text-right">
                      <ContentSdkText field={product.LegHeight} />
                    </dd>
                  </>
                )}

                {!hasDimensions && !isPageEditing && (
                  <p className="text-foreground-muted col-span-2">
                    {t('no_dimensions_text') || 'Specs coming soon'}
                  </p>
                )}
              </dl>
            </div>
          </div>

          <div className={activeTab === 'reviews' ? '' : 'hidden'}>
            <ProductReviews reviews={product.Reviews} rendering={rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};
