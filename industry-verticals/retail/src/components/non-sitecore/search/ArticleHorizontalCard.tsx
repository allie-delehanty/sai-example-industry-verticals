import { ArticleCard } from '@sitecore-search/ui';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import Link from 'next/link';
import { EntityModel } from '@sitecore-search/react';

type ArticleCardItemCardProps = {
  className?: string;
  displayText?: boolean;
  article: EntityModel;
  onItemClick: React.MouseEventHandler<HTMLAnchorElement>;
  index: number;
};

const ArticleHorizontalItemCard = ({ className = '', article }: ArticleCardItemCardProps) => {
  let validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  if (validImageUrl.includes('filters:no_upscale')) {
    validImageUrl = undefined;
  }

  return (
    <Link
      href={article.url}
      className="focus:outline-accent group"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group border-border bg-background relative my-4 flex max-h-52 w-full flex-row flex-nowrap border p-4 transition-shadow hover:shadow-md ${className}`}
      >
        {validImageUrl && (
          <div className="bg-background-surface w-1/4 flex-none overflow-hidden">
            <Image
              src={validImageUrl}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              alt="alt"
              width={500}
              height={115}
            />
          </div>
        )}
        <div className="grow flex-col pl-4">
          <span aria-hidden="true" className="absolute inset-0"></span>
          <span className="text-accent mb-1 text-xs font-semibold tracking-widest uppercase">
            {article.type}
          </span>
          <ArticleCard.Title className="text-foreground mb-2 text-lg font-bold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-2 line-clamp-2 text-sm">
            {article.description}
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};
export default ArticleHorizontalItemCard;
