import { Placeholder, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Heart } from 'lucide-react';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
import { ProductTabs } from '../non-sitecore/ProductTabs';
import QuantityControl from '../non-sitecore/QuantityControl';
import { AddToCartButton } from '../non-sitecore/AddToCartButton';
import { ProductGallery } from '../non-sitecore/ProductGallery';
import { ProductMetaDetals } from '../non-sitecore/ProductMetaDetails';
import { ProductDescription } from '../non-sitecore/ProductDescription';
import { ProductSizeControl } from '../non-sitecore/ProductSizeControl';
import { ProductColorControl } from '../non-sitecore/ProductColorControl';
import NextLink from 'next/link';

interface ProductDetailsProps extends ComponentProps {
  params: { [key: string]: string };
  fields: Product;
}

type ProductDetailsViewProps = ProductDetailsProps & {
  /**
   * When false (Default marketing), commerce CMS params like ShowAddtoCartButton are ignored
   * so live Product Content with ATC=1 still renders as GoTo marketing.
   * When true (Commerce variant), price/options/cart are available.
   */
  enableCommerce?: boolean;
};

const ProductDetailsView = ({
  params,
  fields,
  rendering,
  enableCommerce = false,
}: ProductDetailsViewProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();

  const id = params?.RenderingIdentifier;
  const styles = `${params?.styles || ''}`.trim();
  const isPageEditing = page.mode.isEditing;

  const product = fields;
  const productId = page.layout.sitecore.route?.itemId;

  // Marketing Default: never show retail commerce, regardless of CMS checkbox params.
  // Commerce variant: honor / default-on the commerce params.
  const showPrice = enableCommerce && isParamEnabled(params?.ShowPrice);
  const showProductOptions = enableCommerce && isParamEnabled(params?.ShowProductOptions);
  const showAddToCart = enableCommerce && isParamEnabled(params?.ShowAddtoCartButton);
  const showWishlist = enableCommerce && isParamEnabled(params?.ShowAddtoWishlistButton);
  const showCompare = isParamEnabled(params?.ShowCompareButton);

  const demoHref = params?.DemoLink?.trim() || '/';
  const demoLabel = params?.DemoCtaText?.trim() || t('product_demo_cta') || 'Get a Demo';
  const compareHref = params?.CompareLink?.trim() || '/';
  const compareLabel =
    params?.CompareCtaText?.trim() || t('product_compare_cta') || 'Compare Plans';

  const relatedProductsPlaceholderKey = `related-products-${params?.DynamicPlaceholderId}`;

  const [selectedColor, setSelectedColor] = useState(product?.Color?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.Size?.[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setSelectedColor(product?.Color?.[0]);
    setSelectedSize(product?.Size?.[0]);
    setSelectedQuantity(1);
  }, [product?.Color, product?.Size, productId]);

  if (!fields?.Title) {
    return isPageEditing ? (
      <div className={`component product-details py-6 ${styles}`} id={id}>
        [Product Details]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section className={`component product-details py-10 md:py-16 ${styles}`} id={id}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div
              aria-hidden="true"
              className="bg-accent absolute -top-6 -right-4 -z-10 h-24 w-24 rotate-45 sm:h-32 sm:w-32"
            />
            <div className="border-border bg-background overflow-hidden rounded-2xl border shadow-sm">
              <ProductGallery product={product} key={productId} />
            </div>
          </div>

          <div className="flex max-w-xl flex-col gap-6 lg:pt-2">
            <ProductDescription product={product} showPrice={showPrice} />

            <div className="flex flex-wrap gap-3 pt-1">
              <NextLink href={demoHref} className="main-btn w-auto! min-w-40 px-8">
                {demoLabel}
              </NextLink>
              {(showCompare || !enableCommerce) && (
                <NextLink href={compareHref} className="main-btn-outline w-auto! min-w-40 px-8">
                  {compareLabel}
                </NextLink>
              )}
            </div>

            {enableCommerce && (showProductOptions || showAddToCart) && (
              <div className="border-border space-y-5 border-t pt-6">
                {showProductOptions && (
                  <div className="flex flex-wrap justify-between gap-4">
                    {!!product?.Size?.length && (
                      <div>
                        <p className="mb-2 text-sm font-semibold">
                          {t('product_size_label') || 'Size'}
                        </p>
                        <ProductSizeControl
                          sizes={product.Size}
                          selectedSize={selectedSize}
                          onSelect={setSelectedSize}
                        />
                      </div>
                    )}

                    {!!product?.Color?.length && (
                      <div>
                        <p className="mb-2 text-sm font-semibold">
                          {t('product_color_label') || 'Color'}
                        </p>
                        <ProductColorControl
                          colors={product.Color}
                          selectedColor={selectedColor}
                          onSelect={setSelectedColor}
                        />
                      </div>
                    )}

                    <div>
                      <p className="mb-2 text-sm font-semibold">
                        {t('product_quantity_label') || 'Quantity'}
                      </p>
                      <QuantityControl
                        quantity={selectedQuantity}
                        onChange={setSelectedQuantity}
                        isLarge
                      />
                    </div>
                  </div>
                )}

                {showAddToCart && (
                  <AddToCartButton
                    productId={productId || ''}
                    product={product}
                    selectedQuantity={selectedQuantity}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                  />
                )}

                {showWishlist && (
                  <button type="button" className="action-btn">
                    <Heart className="size-5" strokeWidth={3} />
                    {t('wishlist_btn_text') || 'Add to Wishlist'}
                  </button>
                )}
              </div>
            )}

            <ProductMetaDetals product={product} />
          </div>
        </div>
      </div>

      <ProductTabs
        product={product}
        isPageEditing={isPageEditing}
        dynamicPlaceholderId={params.DynamicPlaceholderId}
        rendering={rendering}
      />

      <Placeholder name={relatedProductsPlaceholderKey} rendering={rendering} />
    </section>
  );
};

/**
 * GoTo marketing PDP. Ignores ShowAddtoCartButton / options / price CMS params
 * so existing Product Content layouts with ATC=1 still look like software product pages.
 */
export const Default = (props: ProductDetailsProps) => (
  <ProductDetailsView {...props} enableCommerce={false} />
);

/**
 * Retail buy-box variant — enables price, options, and cart.
 * Switch the rendering variant to "Commerce" in Sitecore when you need that demo path.
 */
export const Commerce = (props: ProductDetailsProps) => {
  const commerceParams = {
    ...props.params,
    ShowPrice: props.params.ShowPrice ?? '1',
    ShowProductOptions: props.params.ShowProductOptions ?? '1',
    ShowAddtoCartButton: props.params.ShowAddtoCartButton ?? '1',
  };

  return <ProductDetailsView {...props} params={commerceParams} enableCommerce />;
};
