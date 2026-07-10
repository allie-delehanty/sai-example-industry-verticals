const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 4"
      fill="none"
      className={`mt-2 block h-1 w-16 max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className} text-accent`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect width="120" height="4" rx="1" fill="currentColor" />
    </svg>
  );
};

export default AccentLine;
