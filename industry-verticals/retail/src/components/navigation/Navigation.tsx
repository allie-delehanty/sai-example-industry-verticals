'use client';

import React, { useState, useRef, useCallback } from 'react';
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
  inDropdown?: boolean;
  activeDropdownId?: string | null;
  onDropdownChange?: (id: string | null) => void;
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const isDesktopNav = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isSimpleLayout,
  inDropdown = false,
  activeDropdownId = null,
  onDropdownChange,
}) => {
  const { page } = useSitecore();
  const dropdownRef = useRef<HTMLLIElement>(null);

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage && !inDropdown;
  const isActive = hasDropdownMenu && activeDropdownId === fields.Id;

  const closeDropdown = useCallback(() => {
    if (hasDropdownMenu) {
      onDropdownChange?.(null);
    }
  }, [hasDropdownMenu, onDropdownChange]);

  useClickAway(dropdownRef, () => {
    if (!isDesktopNav()) {
      closeDropdown();
    }
  });

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    closeDropdown();
  };

  const openDropdown = () => onDropdownChange?.(fields.Id);
  const toggleDropdown = () => onDropdownChange?.(isActive ? null : fields.Id);

  const children = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isSimpleLayout={isSimpleLayout}
          logoSrc={logoSrc}
          inDropdown={hasDropdownMenu || inDropdown}
          activeDropdownId={activeDropdownId}
          onDropdownChange={onDropdownChange}
        />
      ))
    : null;

  if (inDropdown) {
    return (
      <li ref={dropdownRef} role="none" className={clsx(fields?.Styles?.join(' '), 'w-full')}>
        <Link
          field={getLinkField(fields)}
          editable={page.mode.isEditing}
          onClick={clickHandler}
          role="menuitem"
          className="hover:bg-background-muted block rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
        >
          {getLinkContent(fields, logoSrc)}
        </Link>
        {hasChildren && (
          <ul role="menu" className="border-border mt-1 ml-3 flex flex-col border-l pl-2">
            {children}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li
      ref={dropdownRef}
      role="none"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-10',
        isRootItem && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden',
        isLogoRootItem && 'lg:mr-auto'
      )}
      onMouseEnter={() => {
        if (hasDropdownMenu && isDesktopNav()) {
          openDropdown();
        }
      }}
      onMouseLeave={() => {
        if (hasDropdownMenu && isDesktopNav()) {
          closeDropdown();
        }
      }}
    >
      <div className="flex items-center justify-center gap-0.5">
        <Link
          field={getLinkField(fields)}
          editable={page.mode.isEditing}
          onClick={clickHandler}
          className={clsx(
            'hover:text-foreground-muted text-[15px] font-medium whitespace-nowrap transition-colors',
            isLogoRootItem && '[&_img]:h-7 [&_img]:w-auto lg:[&_img]:h-8'
          )}
        >
          {getLinkContent(fields, logoSrc)}
        </Link>
        {hasDropdownMenu && (
          <button
            type="button"
            aria-label="Toggle submenu"
            aria-haspopup="true"
            aria-expanded={isActive}
            className="flex h-7 w-7 cursor-pointer items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown();
              }
              if (e.key === 'Escape') {
                closeDropdown();
              }
            }}
          >
            <ChevronDown
              className={clsx(
                'size-3.5 transition-transform duration-200',
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
            'flex flex-col',
            isRootItem &&
              !hasDropdownMenu &&
              'items-center gap-x-8 gap-y-4 lg:flex-row xl:gap-x-10',
            hasDropdownMenu &&
              clsx(
                'max-lg:border-border z-110 max-lg:w-full max-lg:items-stretch max-lg:border-b max-lg:pt-1 max-lg:pb-3',
                /* Desktop GoTo-style panel: left-aligned under parent, wider */
                'lg:absolute lg:top-full lg:left-0 lg:mt-0 lg:min-w-56 lg:py-2 lg:transition-all lg:duration-200',
                'lg:border-border lg:bg-background lg:ring-foreground/5 lg:rounded-2xl lg:border lg:shadow-lg lg:ring-1',
                isActive
                  ? 'max-lg:flex'
                  : 'max-lg:hidden lg:pointer-events-none lg:invisible lg:translate-y-1 lg:opacity-0',
                isActive && 'lg:visible lg:translate-y-0 lg:opacity-100'
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
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, Logo: logoImage, SimpleLayout: simpleLayout } = params;

  useStopResponsiveTransition();

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
    const next = forceState ?? !isMenuOpen;
    setIsMenuOpen(next);
    if (!next) {
      setActiveDropdownId(null);
    }
  };

  const isSimpleLayout = isParamEnabled(simpleLayout);
  const logoSrc = extractMediaUrl(logoImage);
  // Logo left (GoTo); preserve prior centering only when there is no logo and not simple layout
  const preparedFields = prepareFields(fields, logoSrc ? false : !isSimpleLayout);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isSimpleLayout={!!isSimpleLayout}
        activeDropdownId={activeDropdownId}
        onDropdownChange={setActiveDropdownId}
      />
    ));

  return (
    <div className={`component navigation bg-transparent ${styles}`} id={id}>
      <div
        className={clsx(
          'relative z-150 flex items-center py-1 lg:hidden',
          '[.component.header_&]:w-full [.component.header_&]:px-0',
          isSimpleLayout && !hasLogoRootItem ? 'justify-end' : 'justify-between'
        )}
      >
        {hasLogoRootItem && (
          <Link
            field={getLinkField(rootItem!)}
            editable={page.mode.isEditing}
            className="navigation-mobile-trigger [&_img]:h-7 [&_img]:w-auto"
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
          className="navigation-mobile-trigger"
        />
      </div>

      <nav
        className={clsx(
          'bg-background z-100 flex duration-300 lg:bg-transparent',
          'max-lg:fixed max-lg:inset-0 max-lg:pt-20',
          !isMenuOpen && 'max-lg:pointer-events-none max-lg:-translate-y-full max-lg:opacity-0'
        )}
      >
        <ul
          role="menubar"
          className={clsx(
            'container flex flex-col items-stretch gap-x-5 gap-y-1 py-6 text-base font-medium max-lg:px-6 lg:flex-row lg:items-center lg:py-0 xl:gap-x-8',
            isSimpleLayout && !hasLogoRootItem && 'lg:justify-end'
          )}
        >
          {navigationItems}
        </ul>
      </nav>
    </div>
  );
};
