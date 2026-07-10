import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    ConsentText?: RichTextField;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner group py-10 md:py-14 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="grid items-center gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {/* Headline */}
          <h2 className="text-accent-dark text-2xl leading-tight font-bold xl:text-3xl">
            <Text field={props.fields?.Title} />
          </h2>

          {/* Form */}
          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative flex">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 h-12 w-full rounded-l-sm border border-r-0 ps-4 pe-3 text-sm focus:ring-2 focus:outline-none md:h-12"
              />

              <button
                type="submit"
                className="bg-accent-soft text-accent-dark hover:bg-accent hover:text-background group-[.container-dark-background]:bg-accent-soft group-[.container-dark-background]:!text-accent-dark shrink-0 rounded-r-sm px-5 text-sm font-semibold tracking-wide uppercase transition-colors md:px-6"
              >
                {t('button_text') || 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const WithConsent = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const uid = props.rendering.uid;
  const { t } = useI18n();

  return (
    <section className={`component subscribe-banner group ${styles ?? ''}`} id={id || undefined}>
      {/* Headline*/}
      <div className="max-w-sm">
        <div className="mb-5">
          <h2 className="text-accent-dark text-lg leading-tight font-bold xl:text-xl">
            <Text field={props.fields?.Title} />
          </h2>
        </div>

        <form className="w-full" action="">
          <label htmlFor={`subscribe-email-${uid}`} className="sr-only">
            {t('enter_email') || 'Enter your email'}
          </label>

          {/* Email and Submit Button */}
          <input
            id={`subscribe-email-${uid}`}
            type="email"
            inputMode="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t('enter_email') || 'Enter your email'}
            className="border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 h-11 w-full rounded-sm border ps-4 pe-4 text-sm focus:ring-2 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-accent-soft text-accent-dark hover:bg-accent hover:text-background group-[.container-dark-background]:bg-accent-soft group-[.container-dark-background]:!text-accent-dark mt-3 inline-flex h-11 w-full items-center justify-center rounded-sm text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            {t('button_text') || 'Sign Up'}
          </button>

          {/* Consent text and Checkbox  */}
          {props.fields?.ConsentText && (
            <div className="mt-4 flex items-start gap-3">
              <input
                id="subscribe-consent"
                type="checkbox"
                className="border-foreground/30 bg-background accent-accent mt-1 size-4 rounded-sm border"
                required
              />
              <label
                htmlFor="subscribe-consent"
                className="text-foreground-light text-sm leading-6"
              >
                <RichText field={props.fields.ConsentText} />
              </label>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
