'use client';

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../shadcn/components/ui/select';
import { Globe } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { localeOptions } from '@/constants/localeOptions';

export type LanguageSwitcherProps = ComponentProps & {
  params: { [key: string]: string };
};

const headerLanguageLabels: Record<string, string> = {
  en: 'English',
  'fr-FR': 'Français',
  'es-ES': 'Español',
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { styles, RenderingIdentifier: id } = props.params;

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { page } = useSitecore();
  const activeLocale = useMemo<string>(() => page?.locale as string, [page?.locale]);

  const changeLanguage = useCallback(
    (langCode: string) => {
      if (pathname && asPath && query) {
        router.push(
          {
            pathname,
            query,
          },
          asPath,
          {
            locale: langCode,
            shallow: false,
          }
        );
      }
    },
    [asPath, pathname, query, router]
  );

  const selectedLocale: string = localeOptions.some((l) => l.code === activeLocale)
    ? activeLocale
    : 'en';

  const headerLabel = headerLanguageLabels[selectedLocale] ?? selectedLocale;

  return (
    <div className={`component language-switcher ${styles}`} id={id}>
      <Select value={selectedLocale} onValueChange={(value) => changeLanguage(value as string)}>
        <SelectTrigger
          id="language-select"
          aria-label={`Current Language: ${headerLabel}`}
          className="text-foreground hover:text-accent h-auto border-0 bg-transparent p-1 shadow-none [&>svg]:hidden"
        >
          <div className="flex items-center gap-2">
            <Globe className="size-5 shrink-0" strokeWidth={1.75} />
            <span className="text-sm font-bold">{headerLabel}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-44 border">
          {localeOptions.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span>{headerLanguageLabels[language.code] ?? language.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
