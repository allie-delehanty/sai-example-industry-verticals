import { LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

type BreadcrumbPage = {
  id: string;
  name: string;
  title: { jsonValue: { value: string } };
  navigationTitle: { jsonValue: { value: string } };
  url: LinkFieldValue;
  navigationFilter: {
    jsonValue: {
      name: string;
    }[];
  };
};

type BreadcrumbProps = ComponentProps & {
  fields: {
    data: {
      datasource: BreadcrumbPage & {
        ancestors: BreadcrumbPage[];
      };
    };
  };
};

/**
 * Breadcrumb UI is fully suppressed for the GoTo marketing experience
 * (trail labels won't match renamed demo content). Component stays registered
 * so existing layout placements don't error — they simply render nothing.
 */
export const Default = (props: BreadcrumbProps) => {
  void props;
  return null;
};
