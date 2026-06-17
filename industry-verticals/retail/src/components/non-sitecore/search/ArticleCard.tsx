import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import { EntityModel } from '@sitecore-search/react';
import { useI18n } from 'next-localization';

type ArticleItemCardProps = {
  className?: string;
  article: EntityModel;
  index: number;
  onItemClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const ArticleItemCard = ({ className = '', article }: ArticleItemCardProps) => {
  const { t } = useI18n();
  const validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  return (
    <Link
      href={article.url}
      className="focus:outline-accent group"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`border-border bg-background relative border transition-shadow hover:shadow-md ${className}`}
      >
        <div className="bg-background-surface h-48 w-full overflow-hidden">
          <Image
            src={validImageUrl}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            alt={article.name || article.title}
            width={500}
            height={200}
            loading="lazy"
          />
        </div>
        <div className="relative flex flex-col gap-2 p-5">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">
            {article.type}
          </span>
          <ArticleCard.Title className="text-foreground line-clamp-2 text-base font-bold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-accent mt-1 text-xs font-semibold tracking-widest uppercase">
            {t('view') || 'Read more'}
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};

export default ArticleItemCard;
