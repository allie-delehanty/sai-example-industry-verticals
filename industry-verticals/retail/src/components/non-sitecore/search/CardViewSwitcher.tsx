import React from 'react';

import { CardViewSwitcher } from '@sitecore-search/ui';

type CardViewSwitcherProps = {
  onToggle: (value: string) => void;
  defaultCardView: 'list' | 'grid';
  GridIcon: React.FC;
  ListIcon: React.FC;
};

const CardViewSwitcherComponent = ({
  onToggle,
  defaultCardView,
  GridIcon,
  ListIcon,
}: CardViewSwitcherProps) => {
  return (
    <CardViewSwitcher.Root
      onValueChange={onToggle}
      defaultValue={defaultCardView}
      className="inline-flex"
    >
      <CardViewSwitcher.Item
        value="grid"
        aria-label="Grid View"
        className="focus:outline-foreground bg-background text-foreground-light hover:text-foreground hover:bg-background-surface data-[state=on]:bg-foreground data-[state=on]:text-background mr-2 ml-0 flex size-7.5 items-center justify-center rounded-full"
      >
        <GridIcon />
      </CardViewSwitcher.Item>
      <CardViewSwitcher.Item
        value="list"
        aria-label="List View"
        className="focus:outline-foreground bg-background text-foreground-light hover:text-foreground hover:bg-background-surface data-[state=on]:bg-foreground data-[state=on]:text-background ml-0 flex size-7.5 items-center justify-center rounded-full"
      >
        <ListIcon />
      </CardViewSwitcher.Item>
    </CardViewSwitcher.Root>
  );
};

export default CardViewSwitcherComponent;
