import type React from 'react';
import { LinkFieldValue, useSitecore } from '@sitecore-content-sdk/nextjs';
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
 * Breadcrumb UI is hidden site-wide for the GoTo marketing experience
 * (page titles in the trail often won't match demo renaming).
 * Rendering stays registered so CMS editors still see a placeholder in edit mode.
 */
export const Default = (props: BreadcrumbProps) => {
  const { params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = useSitecore();

  if (!page.mode?.isEditing) {
    return null;
  }

  return (
    <div className={`component breadcrumb ${styles}`} id={id}>
      [BREADCRUMB NAVIGATION]
    </div>
  );
};
