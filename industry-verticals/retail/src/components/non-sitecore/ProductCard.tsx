import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';

interface ProductCardProps {
  product: Partial<Product> & {
    Rating: number;
  };
  url: string;
  className?: string;
}

export const ProductCard = ({ product, url, className }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <Link href={url} passHref>
      <div
        className={`group border-border hover:border-accent/30 bg-background flex min-h-110 w-full flex-col overflow-hidden border transition-colors hover:shadow-md ${className}`}
      >
        <div className="bg-background-surface flex h-64 w-full items-center justify-center overflow-hidden p-4">
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        <div className="flex grow-1 flex-col items-start px-5 pt-4 pb-6 text-left">
          <p className="text-accent !text-xs font-semibold tracking-widest uppercase">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="!text-foreground mt-2 line-clamp-2 font-bold">
            <Text field={product.Title} />
          </h6>

          <StarRating
            rating={product.Rating || 0}
            showOnlyFilled
            className="!text-accent mt-2 mb-4"
          />

          <h6 className="!text-foreground mt-auto font-semibold">
            <span className="mr-1 align-super text-sm">{currencySymbol} </span>
            {formattedPrice}
          </h6>
        </div>
      </div>
    </Link>
  );
};
