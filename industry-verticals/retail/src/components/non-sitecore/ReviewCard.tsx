import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { SitecoreItem } from '@/types/common';
import { User } from 'lucide-react';

type ReviewCardProps = SitecoreItem<{
  Avatar: ImageField;
  ReviewerName: TextField;
  Caption: TextField;
  Description: TextField;
  ReviewImage: ImageField;
  Rating: Field<number>;
}> & { isPageEditing?: boolean };

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <div className="grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-[1fr_auto] lg:gap-12">
      <blockquote className="text-foreground text-xl leading-relaxed font-medium md:text-2xl lg:text-3xl">
        <Text field={props.fields.Description} />
      </blockquote>

      <div className="flex items-center gap-4 lg:flex-col lg:gap-3">
        <div className="border-accent shrink-0 overflow-hidden border-2">
          {props.fields.Avatar.value?.src || props.isPageEditing ? (
            <ContentSdkImage
              width={80}
              height={80}
              field={props.fields.Avatar}
              className="size-20 object-cover"
            />
          ) : (
            <div className="bg-background-muted text-foreground flex size-20 items-center justify-center">
              <User className="size-10" />
            </div>
          )}
        </div>
        <div className="text-left lg:text-center">
          <div className="text-foreground text-base font-bold">
            <Text field={props.fields.ReviewerName} />
          </div>
          <div className="text-foreground-muted text-sm">
            <Text field={props.fields.Caption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
