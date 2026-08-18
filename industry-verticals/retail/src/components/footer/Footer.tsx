import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import NextLink from 'next/link';
import React from 'react';
import { Phone, CircleHelp } from 'lucide-react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 py-12 text-center md:py-16">
          <h2 className="text-primary-foreground text-3xl font-bold md:text-4xl">
            We’re Here For You 24/7
          </h2>
          <div className="text-primary-foreground/85 max-w-2xl text-base leading-7 [&_*]:text-inherit">
            <RichText field={props.fields.Description} />
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-8">
            <a
              href="tel:8005829533"
              className="text-primary-foreground hover:text-accent flex items-center gap-2 text-lg font-semibold"
            >
              <Phone className="size-5" aria-hidden="true" />
              800.582.9533
            </a>
            <NextLink
              href="/faq"
              className="text-primary-foreground hover:text-accent flex items-center gap-2 text-lg font-semibold"
            >
              <CircleHelp className="size-5" aria-hidden="true" />
              Frequently Asked Questions
            </NextLink>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-7">
            <div className="sm:max-w-40">
              <Image field={props.fields.Logo} />
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 xl:gap-10">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="text-foreground mb-6 text-sm font-bold tracking-[0.08em] uppercase">
                  {title}
                </div>
                <div className="space-y-3 text-sm">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-border bg-background border-t">
        <div className="container flex items-center justify-between py-6 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="text-foreground-muted text-sm max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="text-foreground-muted flex items-center justify-between gap-8 text-sm max-lg:gap-6 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <Link field={props.fields.TermsText} className="hover:text-primary hover:underline" />
            <Link field={props.fields.PolicyText} className="hover:text-primary hover:underline" />
          </div>
        </div>
      </div>
    </section>
  );
};
