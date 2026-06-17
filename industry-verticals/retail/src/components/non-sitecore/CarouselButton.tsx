import ShortArrow from '@/assets/icons/arrow-short/ArrowShort';

interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next';
  className?: string;
}

const CarouselButton = ({ direction = 'next', className = '', ...props }: CarouselButtonProps) => {
  return (
    <button
      className={`!text-foreground bg-background border-border z-10 size-10 content-center border shadow-sm ${className}`}
      {...props}
    >
      <ShortArrow className={direction === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
};

export default CarouselButton;
