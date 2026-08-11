import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import StarRating from '../non-sitecore/StarRating';
import { useLocale } from '@/hooks/useLocaleOptions';
import { calculateAverageRating } from '@/helpers/productUtils';

interface ProductDescriptionProps {
  product: Product;
  /** When false, hides Number Price field (marketing PDP / cards). Field remains in datasource. */
  showPrice?: boolean;
}

export const ProductDescription = ({ product, showPrice = false }: ProductDescriptionProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { currency } = useLocale();

  const reviews = product?.Reviews || [];
  const reviewCount = reviews.length;
  const averageRating = calculateAverageRating(reviews);
  const categoryName = product.Category?.fields?.CategoryName?.value;

  return (
    <>
      {categoryName && <p className="eyebrow-badge mb-4 w-fit">{categoryName}</p>}

      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        <ContentSdkText field={product.Title} />
      </h1>

      {showPrice && (product?.Price?.value || isPageEditing) && (
        <p className="text-foreground-muted mt-3 text-lg">
          {currency} <ContentSdkText field={product.Price} />
        </p>
      )}

      {(product?.ShortDescription?.value || isPageEditing) && (
        <p className="text-foreground-light mt-5 text-lg leading-relaxed md:text-xl">
          <ContentSdkText field={product.ShortDescription} />
        </p>
      )}

      {!!product?.Reviews?.length && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-foreground text-base font-semibold">{averageRating}</span>
          <StarRating rating={averageRating} className="text-foreground" />
          <div className="bg-foreground-muted h-5 w-px" />
          <span className="text-foreground-muted text-sm">
            {reviewCount} customer review{reviewCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </>
  );
};
