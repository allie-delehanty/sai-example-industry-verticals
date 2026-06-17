import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <header className={`component header sticky top-0 z-50 ${styles}`} id={id}>
      <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />

      <div className="header-utility-bar pointer-events-none absolute top-0 right-0 left-0 z-20">
        <div className="container flex items-center justify-end gap-4 py-3 lg:min-h-[4.5rem] lg:gap-6 lg:py-4">
          <div className="pointer-events-auto flex items-center gap-3 pr-12 lg:gap-5 lg:pr-0">
            <Placeholder
              name={`header-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </header>
  );
};
