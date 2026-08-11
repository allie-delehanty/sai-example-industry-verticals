import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ProductDetails, Commerce } from '../components/product-details/ProductDetails';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = ComponentProps<typeof ProductDetails> &
  BackgroundColorArgs & {
    showCompareButton?: boolean;
    showAddToCartButton?: boolean;
    showAddtoWishlistButton?: boolean;
    showPrice?: boolean;
    showProductOptions?: boolean;
  };

const meta = {
  title: 'Products/Product Details',
  component: ProductDetails,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    showCompareButton: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    showAddToCartButton: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showAddtoWishlistButton: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showPrice: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showProductOptions: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    showCompareButton: true,
    showAddToCartButton: false,
    showAddtoWishlistButton: false,
    showPrice: false,
    showProductOptions: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
  DemoCtaText: 'Get a Demo',
  DemoLink: '/',
  CompareCtaText: 'Compare Plans',
  CompareLink: '/',
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Product Details',
  params: baseParams,
  placeholders: {
    [`product-reviews-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
    [`related-products-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

const [mockProduct] = createProductItems(1);

export const Default: Story = {
  name: 'Marketing (GoTo)',
  render: (args) => {
    const params = {
      ...baseParams,
      ShowCompareButton: boolToSitecoreCheckbox(args.showCompareButton),
      ShowAddtoCartButton: boolToSitecoreCheckbox(args.showAddToCartButton),
      ShowAddtoWishlistButton: boolToSitecoreCheckbox(args.showAddtoWishlistButton),
      ShowPrice: boolToSitecoreCheckbox(args.showPrice),
      ShowProductOptions: boolToSitecoreCheckbox(args.showProductOptions),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <ProductDetails params={params} rendering={baseRendering} fields={mockProduct.fields} />;
  },
};

export const WithCommerce: Story = {
  name: 'Commerce variant',
  render: (args) => {
    const params = {
      ...baseParams,
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <Commerce params={params} rendering={baseRendering} fields={mockProduct.fields} />;
  },
};
