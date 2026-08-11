import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';
import { useI18n } from 'next-localization';

interface ProductCardProps {
  product: Partial<Product> & {
    Rating: number;
  };
  url: string;
  className?: string;
  /** Opt-in retail price display. Default hidden for GoTo-style solution tiles. */
  showPrice?: boolean;
}

export const ProductCard = ({ product, url, className, showPrice = false }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const { t } = useI18n();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <Link href={url} passHref className="group block">
      <div
        className={`border-border bg-background flex min-h-123 w-full flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-md ${className}`}
      >
        <div className="bg-background-surface relative flex h-64 w-full items-center justify-center p-6 sm:h-72">
          <div aria-hidden="true" className="bg-accent absolute top-0 left-0 h-1.5 w-full" />
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-contain"
            priority
          />
        </div>

        <div className="flex grow-1 flex-col items-start px-5 pt-4 pb-6 text-left">
          <p className="!text-foreground-muted text-xs font-semibold tracking-[0.1em] uppercase">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="!text-foreground mt-1 line-clamp-2 text-lg font-bold tracking-tight">
            <Text field={product.Title} />
          </h6>

          {!!product.Rating && (
            <StarRating
              rating={product.Rating || 0}
              showOnlyFilled
              className="text-foreground mt-2"
            />
          )}

          {showPrice && formattedPrice != null && formattedPrice !== '' ? (
            <h6 className="!text-foreground mt-auto pt-4 font-semibold">
              <span className="mr-1 align-super text-sm">{currencySymbol} </span>
              {formattedPrice}
            </h6>
          ) : (
            <span className="arrow-btn mt-auto pt-5 text-sm">
              {t('product_card_cta') || 'Learn more'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
