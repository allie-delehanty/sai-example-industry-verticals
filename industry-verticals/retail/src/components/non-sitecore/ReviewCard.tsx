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
    <div className="flex h-full flex-col">
      <div className="aspect-4/3 w-full overflow-hidden rounded-sm">
        <ContentSdkImage className="image-cover rounded-sm" field={props.fields.ReviewImage} />
      </div>
      <div className="bg-background border-border relative mx-4 -mt-8 flex min-h-64 flex-col items-center justify-between rounded-sm border p-6 text-center shadow-sm">
        <div className="bg-background border-border absolute -top-8 flex h-[64px] w-[64px] items-center justify-center rounded-full border">
          {props.fields.Avatar.value?.src || props.isPageEditing ? (
            <ContentSdkImage
              width={50}
              height={50}
              field={props.fields.Avatar}
              className="h-[50px] w-[50px] rounded-full"
            />
          ) : (
            <div className="!text-foreground bg-background-muted flex h-[50px] w-[50px] items-center justify-center rounded-full">
              <User className="size-8" />
            </div>
          )}
        </div>
        <div className="mt-6">
          <div className="text-foreground text-center text-lg leading-normal font-bold">
            <Text field={props.fields.ReviewerName} />
          </div>
          <div className="text-foreground-muted text-center text-sm leading-normal">
            <Text field={props.fields.Caption} />
          </div>
        </div>
        <div className="text-foreground-light text-center text-sm leading-6">
          <Text field={props.fields.Description} />
        </div>
        <StarRating rating={props.fields.Rating.value} />
      </div>
    </div>
  );
};

export default ReviewCard;
