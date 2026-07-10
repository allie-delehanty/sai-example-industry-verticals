import React from 'react';
import { LinkField, Link as ContentSdkLink, Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/assets/icons/social/social';

interface Fields {
  SocialTitle: Field<string>;
  FacebookLink: LinkField;
  YoutubeLink: LinkField;
  InstagramLink: LinkField;
  TwitterLink: LinkField;
  LinkedinLink: LinkField;
  PinterestLink: LinkField;
}

type SocialFollowProps = ComponentProps & {
  fields: Fields;
  params: { [key: string]: string };
};

export const Default = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: faFacebookF, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: faTwitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: faInstagram, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: faYoutube, field: props.fields.YoutubeLink, key: 'youtube' },
    { icon: faLinkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
  ];

  return (
    <div className={`component social-follow ${props?.params?.styles}`} id={id}>
      <h5 className="text-foreground mb-5 text-sm font-bold tracking-wide">
        <Text field={props.fields.SocialTitle} />
      </h5>
      <div className="flex flex-col gap-y-3">
        {socialLinks.map(({ icon, field, key }) => (
          <div key={key} className="flex items-center gap-2">
            {field?.value?.href && (
              <>
                <FontAwesomeIcon icon={icon} className="text-accent text-base" />
                <ContentSdkLink
                  field={field}
                  className="text-foreground-light hover:text-accent text-sm hover:underline"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Horizontal = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: FacebookIcon, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: TwitterIcon, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: InstagramIcon, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: LinkedinIcon, field: props.fields.LinkedinLink, key: 'linkedin' },
    { icon: YoutubeIcon, field: props.fields.YoutubeLink, key: 'youtube' },
  ];

  return (
    <div className={`component social-follow ${props?.params?.styles}`} id={id}>
      <h5 className="text-foreground mb-4 text-sm font-bold tracking-wide">
        <Text field={props.fields.SocialTitle} />
      </h5>

      <div className="flex flex-wrap gap-3">
        {socialLinks.map(({ icon: Icon, field, key }) =>
          field?.value?.href ? (
            <ContentSdkLink
              key={key}
              field={field}
              className="border-border text-accent hover:border-accent hover:bg-accent-soft flex size-10 items-center justify-center rounded-full border transition-colors"
              aria-label={key}
            >
              <Icon />
            </ContentSdkLink>
          ) : null
        )}
      </div>
    </div>
  );
};
