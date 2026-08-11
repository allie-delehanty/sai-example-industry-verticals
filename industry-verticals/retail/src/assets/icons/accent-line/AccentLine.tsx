/** GoTo brand underline — short yellow bar inspired by logo geometry */
const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 12"
      fill="none"
      className={`mt-2 block h-[0.35em] w-[4ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className} text-accent`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8c18-6 48-10 78-6 14 2 28 6 38 6"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AccentLine;
