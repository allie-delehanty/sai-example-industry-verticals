import React, { JSX, useState, useEffect } from 'react';
import { User, Heart, ShoppingCart, X, Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { usePathname, useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { MiniCart } from '../non-sitecore/MiniCart';
import { LinkField } from '@sitecore-content-sdk/nextjs';
import PreviewSearch from '../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type NavigationIconsProps = ComponentProps & {
  fields: {
    CheckoutPage: LinkField;
    AccountPage: LinkField;
    WishlistPage: LinkField;
  };
  params: { [key: string]: string };
};

const IconDropdown = ({
  icon,
  label,
  children,
}: {
  icon: JSX.Element;
  label: string;
} & React.PropsWithChildren) => (
  <Popover>
    <PopoverTrigger
      className="text-foreground hover:text-foreground-muted data-[state=open]:text-foreground-muted rounded-full p-2 transition-colors"
      aria-label={label}
    >
      {icon}
    </PopoverTrigger>
    <PopoverContent className="flex w-xl flex-col">
      <PopoverClose className="surface-btn !text-foreground shrink-0 self-end">
        <X className="size-4" />
      </PopoverClose>
      <div className="">{children}</div>
    </PopoverContent>
  </Popover>
);

/**
 * Header action cluster: search primary; account/wishlist/cart available via params.
 * Cart: hidden when HideCartIcon is present (any value) or =1; force with ShowCartIcon=1.
 */
export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = isParamEnabled(props.params.ShowCartIcon)
    ? true
    : !('HideCartIcon' in (props.params || {}));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { t } = useI18n();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
        <div className="flex items-center gap-0.5 sm:gap-1 [.component.header_&]:justify-end [.component.header_&]:px-0 [.component.header_&]:py-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-foreground-muted text-foreground rounded-full p-2 transition-colors"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>

          {showAccountIcon && (
            <span className="max-md:hidden">
              <IconDropdown icon={<User className="size-5" />} label="Account">
                <p>{t('account-empty') || 'You are not logged in.'}</p>
              </IconDropdown>
            </span>
          )}

          {showWishlistIcon && (
            <span className="max-md:hidden">
              <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
                <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
              </IconDropdown>
            </span>
          )}

          {showCartIcon && (
            <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
              <MiniCart showWishlist={showWishlistIcon} checkoutPage={props.fields?.CheckoutPage} />
            </IconDropdown>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-lg">
          <div className="container py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground-muted hover:text-foreground p-3 transition-colors"
                aria-label="Close search"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
