'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronDown } from 'lucide-react';
import HamburgerIcon from '@/components/non-sitecore/HamburgerIcon';
import { useClickAway } from '@/hooks/useClickAway';
import { useStopResponsiveTransition } from '@/hooks/useStopResponsiveTransition';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  getLinkContent,
  getLinkField,
  isNavLevel,
  isNavRootItem,
  prepareFields,
} from '@/helpers/navHelpers';
import clsx from 'clsx';
import { isParamEnabled } from '@/helpers/isParamEnabled';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children?: Array<NavItemFields>;
  Styles: string[];
}

interface NavigationListItemProps {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  logoSrc?: string;
  isSimpleLayout?: boolean;
  variant?: 'default' | 'header-primary';
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isSimpleLayout,
  variant = 'default',
}) => {
  const { page } = useSitecore();
  const [isActive, setIsActive] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  useClickAway(dropdownRef, () => setIsActive(false));

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);
  const isHeaderPrimary = variant === 'header-primary';

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage;

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    setIsActive(false);
  };

  const children = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isSimpleLayout={isSimpleLayout}
          logoSrc={logoSrc}
          variant={variant}
        />
      ))
    : null;

  const linkClassName = isHeaderPrimary
    ? 'hover:text-background/85 text-background text-sm font-bold whitespace-nowrap transition-colors'
    : 'hover:text-foreground-light text-foreground whitespace-nowrap transition-colors';

  return (
    <li
      ref={dropdownRef}
      tabIndex={0}
      role="menuitem"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-10',
        isRootItem && !isHeaderPrimary && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden',
        isLogoRootItem && isSimpleLayout && 'lg:mr-auto'
      )}
    >
      <div className="flex items-center justify-center gap-1">
        <Link
          field={getLinkField(fields)}
          editable={page.mode.isEditing}
          onClick={clickHandler}
          className={linkClassName}
        >
          {getLinkContent(fields, logoSrc)}
        </Link>
        {hasDropdownMenu && (
          <button
            type="button"
            aria-label="Toggle submenu"
            aria-haspopup="true"
            aria-expanded={isActive}
            className={clsx(
              'flex h-6 w-6 cursor-pointer items-center justify-center',
              isHeaderPrimary ? 'text-background' : 'text-foreground'
            )}
            onClick={() => setIsActive((a) => !a)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsActive((a) => !a);
              }
            }}
          >
            <ChevronDown
              className={clsx(
                'size-4 transition-transform duration-300',
                isActive && 'rotate-180',
                'navigation-dropdown-trigger'
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && (
        <ul
          role="menu"
          className={clsx(
            'flex flex-col items-center gap-x-8 gap-y-4 xl:gap-x-10',
            isRootItem && !isHeaderPrimary && 'lg:flex-row',
            hasDropdownMenu &&
              clsx(
                'z-110 text-base max-lg:border-b max-lg:pb-4 max-lg:text-sm',
                isHeaderPrimary ? 'max-lg:border-background/20' : 'max-lg:border-border',
                'lg:absolute lg:top-full lg:left-0 lg:p-4 lg:transition-all lg:duration-300',
                isHeaderPrimary
                  ? 'lg:bg-navy lg:border-border lg:border lg:shadow-lg'
                  : 'lg:bg-background lg:border-border lg:border lg:shadow-lg',
                isActive
                  ? 'max-lg:flex'
                  : 'max-lg:hidden lg:pointer-events-none lg:translate-y-2 lg:scale-95 lg:opacity-0'
              )
          )}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

export const Default = ({ params, fields }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInHeader, setIsInHeader] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, Logo: logoImage, SimpleLayout: simpleLayout } = params;

  useStopResponsiveTransition();

  useLayoutEffect(() => {
    setIsInHeader(!!rootRef.current?.closest('.component.header'));
  }, []);

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation ${styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, forceState?: boolean) => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }
    setIsMenuOpen(forceState ?? !isMenuOpen);
  };

  const isSimpleLayout = isParamEnabled(simpleLayout);
  const preparedFields = prepareFields(fields, !isSimpleLayout && !isInHeader);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const logoSrc = extractMediaUrl(logoImage);
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => {
      if (!item) return false;
      if (isInHeader && hasLogoRootItem && isNavRootItem(item)) return false;
      return true;
    })
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isSimpleLayout={!!isSimpleLayout}
        variant={isInHeader ? 'header-primary' : 'default'}
      />
    ));

  const logoLink = hasLogoRootItem ? (
    <Link
      field={getLinkField(rootItem!)}
      editable={page.mode.isEditing}
      className="inline-flex shrink-0 items-center"
      onClick={(event) => handleToggleMenu(event, false)}
    >
      {getLinkContent(rootItem!, logoSrc)}
    </Link>
  ) : null;

  if (isInHeader) {
    return (
      <div ref={rootRef} className={`component navigation ${styles}`} id={id}>
        {/* Mobile: logo + hamburger */}
        <div className="navigation-mobile-utility">
          <div className="container">
            {logoLink}
            <HamburgerIcon
              isOpen={isMenuOpen}
              onClick={handleToggleMenu}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleMenu();
                }
              }}
              className="navigation-mobile-trigger"
              variant="dark"
            />
          </div>
        </div>

        {/* Desktop tier 1: logo (utilities overlay via Header) */}
        <div className="navigation-utility-tier hidden lg:block">
          <div className="container">{logoLink}</div>
        </div>

        {/* Tier 2: primary navigation — desktop */}
        <div className="navigation-primary-tier hidden lg:block">
          <nav className="flex w-full">
            <ul
              role="menubar"
              className="container flex flex-row flex-wrap items-center justify-start gap-x-6 py-0 xl:gap-x-8"
            >
              {navigationItems}
            </ul>
          </nav>
        </div>

        {/* Mobile menu overlay */}
        <nav
          className={clsx(
            'bg-background border-border fixed inset-0 top-14 z-100 flex border-b duration-300 lg:hidden',
            !isMenuOpen && 'pointer-events-none -translate-y-full opacity-0'
          )}
        >
          <ul role="menubar" className="container flex flex-col items-start gap-y-4 py-6">
            {Object.values(preparedFields)
              .filter((item): item is NavItemFields => !!item)
              .map((item) => (
                <NavigationListItem
                  key={item.Id}
                  fields={item}
                  handleClick={(event) => handleToggleMenu(event, false)}
                  logoSrc={logoSrc}
                  isSimpleLayout={!!isSimpleLayout}
                  variant="default"
                />
              ))}
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`component navigation bg-background ${styles}`} id={id}>
      <div
        className={clsx(
          'relative z-150 container flex items-center py-3 lg:hidden',
          !isSimpleLayout &&
            '[.component.header_&]:grid-cols-2 [.component.header_&]:px-0 [.component.header_&]:max-lg:grid',
          !isSimpleLayout ? 'flex-row-reverse' : '',
          isSimpleLayout && !hasLogoRootItem ? 'justify-end' : 'justify-between'
        )}
      >
        {hasLogoRootItem && (
          <Link
            field={getLinkField(rootItem!)}
            editable={page.mode.isEditing}
            className={clsx(
              'navigation-mobile-trigger',
              !isSimpleLayout && '[.component.header_&]:mx-auto'
            )}
          >
            {getLinkContent(rootItem!, logoSrc)}
          </Link>
        )}
        <HamburgerIcon
          isOpen={isMenuOpen}
          onClick={handleToggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMenu();
            }
          }}
          className={clsx(
            'navigation-mobile-trigger',
            !isSimpleLayout && '[.component.header_&]:-order-1'
          )}
        />
      </div>

      <nav
        className={clsx(
          'bg-background z-100 flex duration-300',
          'max-lg:fixed max-lg:inset-0',
          !isMenuOpen && 'max-lg:-translate-y-full max-lg:opacity-0'
        )}
      >
        <ul
          role="menubar"
          className={clsx(
            'container flex flex-col items-center justify-center gap-x-6 gap-y-4 py-6 text-sm lg:flex-row xl:gap-x-10',
            isSimpleLayout && !hasLogoRootItem && 'lg:justify-end'
          )}
        >
          {Object.values(preparedFields)
            .filter((item): item is NavItemFields => !!item)
            .map((item) => (
              <NavigationListItem
                key={item.Id}
                fields={item}
                handleClick={(event) => handleToggleMenu(event, false)}
                logoSrc={logoSrc}
                isSimpleLayout={!!isSimpleLayout}
              />
            ))}
        </ul>
      </nav>
    </div>
  );
};
