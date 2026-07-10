import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import StarRating from './StarRating';
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
    <>
      <div className="aspect-square min-h-80 w-full overflow-hidden rounded-sm">
        <ContentSdkImage className="image-cover rounded-sm" field={props.fields.ReviewImage} />
      </div>
      <div className="px-4">
        <div className="border-border bg-background relative -top-12 flex min-h-64 flex-col items-center justify-between rounded-sm border p-6 text-center shadow-md">
          {/* Image */}
          <div className="bg-background border-border absolute -top-8 flex h-14 w-14 items-center justify-center rounded-full border">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={48}
                height={48}
                field={props.fields.Avatar}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <div className="!text-foreground bg-background-muted flex h-12 w-12 items-center justify-center rounded-full">
                <User className="size-6" />
              </div>
            )}
          </div>
          <div className="!text-foreground-light mt-4">
            <div className="text-accent-dark text-center text-lg leading-normal font-bold">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-center text-xs leading-normal font-medium tracking-wide uppercase">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="!text-foreground-light text-center text-sm leading-relaxed font-normal">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
