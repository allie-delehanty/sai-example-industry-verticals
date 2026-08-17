const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      className={`bg-accent mt-3 block h-1 w-16 max-w-full ${className ?? ''}`}
      aria-hidden="true"
    />
  );
};

export default AccentLine;
