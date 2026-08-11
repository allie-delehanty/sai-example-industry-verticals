import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as Promo,
  WithFullImage,
  PromoProps,
  WithQuote,
  FeatureCard,
  ProductSpotlight,
  TextLead,
  DarkBand,
  StatCallout,
} from '../components/promo/Promo';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';
import { CommonStyles, LayoutStyles, PromoFlags } from '@/types/styleFlags';

type StoryProps = PromoProps &
  BackgroundColorArgs & {
    ShowMultipleImages: boolean;
    Reversed: boolean;
    HideCurveLine: boolean;
    HideShapes: boolean;
    HideShadows: boolean;
    HideQuote: boolean;
  };

const meta = {
  title: 'Page Content/Promo',
  component: Promo,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    ShowMultipleImages: {
      control: 'boolean',
      name: 'Show Multiple Images',
    },
    Reversed: {
      control: 'boolean',
      name: 'Promo Reversed',
    },
    HideCurveLine: {
      control: 'boolean',
      name: 'Hide Curve Line',
    },
    HideShapes: {
      control: 'boolean',
      name: 'Hide Shapes',
    },
    HideShadows: {
      control: 'boolean',
      name: 'Hide Shadows',
    },
    HideQuote: {
      control: 'boolean',
      name: 'Hide Quote',
    },
  },
  args: {
    ShowMultipleImages: false,
    Reversed: false,
    HideCurveLine: false,
    HideShapes: false,
    HideShadows: false,
    HideQuote: false,
    ...defaultBackgroundColorArgs,
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Promo',
  params: baseParams,
};

const baseFields = {
  PromoImageOne: createImageField('placeholder'),
  PromoImageTwo: createImageField('placeholder'),
  PromoImageThree: createImageField('placeholder'),
  PromoTitle: createTextField('Unified Business Communications Software'),
  PromoDescription: createRichTextField(1, 'paragraphs'),
  PromoSubTitle: createTextField('Product Update'),
  PromoMoreInfo: createLinkField('Learn More'),
};

export const Default: Story = {
  argTypes: {
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed,
      args.ShowMultipleImages && PromoFlags.ShowMultipleImages,
      args.HideShapes && PromoFlags.HidePromoShapes,
      args.HideShadows && PromoFlags.HidePromoShadows,
      args.HideCurveLine && CommonStyles.HideAccentLine
    );

    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <Promo params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const WideImagePromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideCurveLine: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <WithFullImage params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const QuotePromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed,
      args.HideQuote && PromoFlags.HidePromoQuotes,
      args.HideCurveLine && CommonStyles.HideAccentLine
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <WithQuote params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const FeatureCardPromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideCurveLine: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <FeatureCard params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const ProductSpotlightPromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideCurveLine: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <ProductSpotlight params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const TextLeadPromo: Story = {
  argTypes: {
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed,
      args.ShowMultipleImages && PromoFlags.ShowMultipleImages,
      args.HideShapes && PromoFlags.HidePromoShapes,
      args.HideShadows && PromoFlags.HidePromoShadows,
      args.HideCurveLine && CommonStyles.HideAccentLine
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <TextLead params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const DarkBandPromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
    HideQuote: { table: { disable: true } },
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed,
      args.HideCurveLine && CommonStyles.HideAccentLine
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <DarkBand params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const StatCalloutPromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideCurveLine: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
    HideQuote: { table: { disable: true } },
  },
  args: {
    ...defaultBackgroundColorArgs,
  },
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    const fields = {
      ...baseFields,
      PromoSubTitle: createTextField('Trusted globally'),
      PromoTitle: createTextField('85%'),
      PromoDescription: createRichTextField(1, 'paragraphs'),
    };
    return <StatCallout params={params} rendering={baseRendering} fields={fields} />;
  },
};
