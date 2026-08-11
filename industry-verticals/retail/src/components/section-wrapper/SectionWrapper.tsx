import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { ComponentProps } from '@/lib/component-props';
import { CommonStyles } from '@/types/styleFlags';
import { Field, Link, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Link: LinkField;
}

interface SectionWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: SectionWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);
  const placeholderKey = `section-wrapper-content-${params.DynamicPlaceholderId}`;

  return (
    <section
      className={`component section-wrapper pt-16 pb-12 md:pt-20 md:pb-16 ${styles}`}
      id={id}
    >
      <div className="container flex flex-col items-start">
        <h2 className="max-w-3xl text-left tracking-tight">
          <Text field={fields.Title} />
          {!hideAccentLine && <AccentLine className="!h-3 w-[5ch]" />}
        </h2>

        <div className="mt-8 mb-12 w-full">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>

        <Link field={fields.Link} className="main-btn w-auto! min-w-40 px-8" />
      </div>
    </section>
  );
};
