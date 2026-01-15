import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'rgb(235, 123, 37)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#grad1)" />
      <path d="M12 12C12 10.8954 12.8954 10 14 10H20C21.1046 10 22 10.8954 22 12V14C22 15.1046 21.1046 16 20 16H14C12.8954 16 12 16.8954 12 18V20C12 21.1046 11.1046 22 10 22H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
