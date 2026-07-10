import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

/**
 * ATCC-style header: logo + icons on the first row, full-width nav on the second (desktop).
 * Mobile keeps the existing single-row / hamburger behavior.
 */
export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div
      className={`component header border-border bg-background relative z-50 border-b shadow-sm ${styles}`}
      id={id}
    >
      <div className="container flex flex-wrap items-center gap-x-3 lg:gap-x-5">
        <div className="py-2 max-lg:order-1 lg:order-1 lg:py-3">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="lg:border-border max-lg:order-0 max-lg:mr-auto max-lg:w-2/3 lg:order-3 lg:w-full lg:border-t">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="py-2 max-lg:order-2 lg:order-2 lg:ml-auto lg:py-3">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
