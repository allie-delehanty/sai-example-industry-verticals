import React, { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Phone } from 'lucide-react';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div
      className={`component header bg-primary text-primary-foreground sticky top-0 z-200 ${styles}`}
      id={id}
    >
      <div className="border-primary-foreground/15 hidden border-b md:block">
        <div className="container flex items-center justify-between py-1.5 text-xs">
          <Link
            href="/careers"
            className="text-accent hover:text-accent/90 font-semibold tracking-wide"
          >
            Careers
          </Link>
          <a
            href="tel:8005829533"
            className="text-primary-foreground hover:text-accent flex items-center gap-2"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            <span>
              Call Us 24/7 <span className="font-semibold">800.582.9533</span>
            </span>
          </a>
        </div>
      </div>
      <div className="container flex items-center gap-3 lg:gap-5">
        <div className="max-lg:order-1 lg:flex-[1_1]">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-0 max-lg:mr-auto max-lg:w-2/3 lg:flex-[4_1]">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-2 lg:flex-[1_1]">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
