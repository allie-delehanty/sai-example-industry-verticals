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
import React from 'react';

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
      {/* GoTo-style solid black footer */}
      <div className="bg-foreground text-background">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_3fr] lg:py-20">
          <div className="flex flex-col gap-7">
            <div className="brightness-0 invert sm:max-w-34">
              <Image field={props.fields.Logo} />
            </div>
            <RichText
              field={props.fields.Description}
              className="text-background/70 text-sm leading-relaxed [&_*]:text-inherit"
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5 xl:gap-10">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="text-background/60 mb-6 text-xs font-bold tracking-[0.14em] uppercase">
                  {title}
                </div>
                <div className="text-background/90 [&_a:hover]:text-accent space-y-3 text-sm [&_a]:transition-colors">
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-background/15 bg-foreground text-background border-t">
        <div className="container flex items-center justify-between py-6 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="text-background/60 text-sm max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="flex items-center justify-between gap-10 text-sm max-lg:gap-8 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <Link
              field={props.fields.TermsText}
              className="text-background/80 hover:text-accent transition-colors hover:underline"
            />
            <Link
              field={props.fields.PolicyText}
              className="text-background/80 hover:text-accent transition-colors hover:underline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
