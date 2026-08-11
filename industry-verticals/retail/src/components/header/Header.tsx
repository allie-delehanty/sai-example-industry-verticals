import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import NextLink from 'next/link';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

/**
 * GoTo-style two-tier header:
 * - Utility strip: header-left (language, utility links)
 * - Main bar: header-nav + optional CTA (params) + header-right (search/cart)
 */
export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const hideCta = isParamEnabled(props.params.HideCta);
  const ctaText = props.params.CtaText?.trim() || 'Get a Demo';
  const ctaLink = props.params.CtaLink?.trim() || '/';

  return (
    <div className={`component header bg-background sticky top-0 z-200 ${styles}`} id={id}>
      {/* Utility bar */}
      <div className="border-border/70 border-b">
        <div className="text-foreground-muted [&_a]:hover:text-foreground container flex min-h-9 items-center justify-end gap-4 py-1.5 text-xs font-medium [&_.component]:py-0">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>

      {/* Main bar */}
      <div className="border-border border-b">
        <div className="container flex min-h-14 items-center gap-3 py-2.5 lg:min-h-16 lg:gap-6 lg:py-3">
          <div className="min-w-0 flex-1">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {!hideCta && (
              <NextLink href={ctaLink} className="header-cta max-sm:hidden">
                {ctaText}
              </NextLink>
            )}
            <Placeholder
              name={`header-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
