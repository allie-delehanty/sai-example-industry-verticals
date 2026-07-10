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
  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const linkColumns = [
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
  ];

  return (
    <section className={`component footer atcc-footer relative ${props.params.styles}`} id={id}>
      {/* Pronounced ATCC-style organic wave into the gray footer */}
      <div className="atcc-footer__wave" aria-hidden="true">
        <svg
          className="atcc-footer__wave-svg atcc-footer__wave-svg--desktop"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,40 C180,80 360,0 540,28 C720,56 900,80 1080,40 C1260,0 1380,48 1440,56 L1440,80 L0,80 Z"
          />
        </svg>
        <svg
          className="atcc-footer__wave-svg atcc-footer__wave-svg--mobile"
          viewBox="0 0 375 48"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,20 C60,40 120,4 180,18 C240,32 300,44 375,22 L375,48 L0,48 Z"
          />
        </svg>
      </div>

      <div className="atcc-footer__body">
        <div className="container">
          {/* Brand row */}
          <div className="atcc-footer__brand">
            <div className="atcc-footer__logo">
              <Image field={props.fields.Logo} />
            </div>
            <RichText field={props.fields.Description} className="atcc-footer__description" />
          </div>

          {/* Link columns — ATCC equal-column layout */}
          <div className="atcc-footer__cols">
            {linkColumns.map(({ key, title, content }) => (
              <div key={key} className="atcc-footer__col">
                <h2 className="atcc-footer__title">{title}</h2>
                <div className="atcc-footer__links">{content}</div>
              </div>
            ))}

            {/* Fifth slot: social / newsletter / extras */}
            <div className="atcc-footer__col atcc-footer__col--aside">
              <h2 className="atcc-footer__title">
                <Text field={props.fields.TitleFive} />
              </h2>
              <div className="atcc-footer__aside">
                <Placeholder name={phKeyFive} rendering={props.rendering} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="atcc-footer__legal">
        <div className="atcc-footer__legal-inner container">
          <div className="atcc-footer__copyright">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="atcc-footer__legal-links">
            <Link field={props.fields.TermsText} />
            <Link field={props.fields.PolicyText} />
          </div>
        </div>
      </div>
    </section>
  );
};
