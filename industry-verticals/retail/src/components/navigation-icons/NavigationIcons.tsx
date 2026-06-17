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
      className="text-foreground hover:text-accent data-[state=open]:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </PopoverTrigger>
    <PopoverContent className="flex w-xl flex-col">
      <PopoverClose className="surface-btn !text-foreground shrink-0 self-end">
        <X className="size-4" />
      </PopoverClose>
      <div>{children}</div>
    </PopoverContent>
  </Popover>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { t } = useI18n();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div
        className={`component navigation-icons relative ${props?.params?.styles?.trimEnd()}`}
        id={id}
      >
        <div className="flex items-center gap-4 lg:gap-5 [.component.header_&]:justify-end [.component.header_&]:p-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-foreground hover:text-accent p-1 transition-colors"
            aria-label="Search"
          >
            <Search className="size-5" strokeWidth={2} />
          </button>

          <div className="hidden items-center gap-3 sm:flex lg:gap-4">
            {showAccountIcon && (
              <IconDropdown icon={<User className="size-5" />} label="Account">
                <p>{t('account-empty') || 'You are not logged in.'}</p>
              </IconDropdown>
            )}

            {showWishlistIcon && (
              <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
                <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
              </IconDropdown>
            )}

            {showCartIcon && (
              <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
                <MiniCart
                  showWishlist={showWishlistIcon}
                  checkoutPage={props.fields?.CheckoutPage}
                />
              </IconDropdown>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-border bg-background fixed top-14 right-0 left-0 z-50 border-b shadow-lg lg:absolute lg:top-full">
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
