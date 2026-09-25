type NavIconProps = {
  name: 'work' | 'experience' | 'skills' | 'about';
  className?: string;
};

export default function NavIcon({ name, className }: NavIconProps) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'work' && (
        <>
          <path d="m12 4 8 4.5-8 4.5-8-4.5L12 4Z" />
          <path d="m4 13.5 8 4.5 8-4.5" />
        </>
      )}
      {name === 'experience' && (
        <>
          <path d="M7 17h2a3 3 0 0 0 3-3m0-4a3 3 0 0 1 3-3h2" />
          <circle cx="5" cy="17" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="7" r="2" />
        </>
      )}
      {name === 'skills' && (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="15" y="15" width="4" height="4" rx=".5" fill="currentColor" stroke="none" />
        </>
      )}
      {name === 'about' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M6.5 18.5v-1c0-2.4 2.2-4 5.5-4s5.5 1.6 5.5 4v1" />
        </>
      )}
    </svg>
  );
}
