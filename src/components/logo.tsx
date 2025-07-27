import React from 'react';

export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M16 2.66663L26.6667 9.33329V22.6666L16 29.3333L5.33333 22.6666V9.33329L16 2.66663Z"
        stroke="url(#grad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3333 16L16 12.6667L10.6667 16"
        stroke="url(#grad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <path
        d="M16 22.6667V12.6667"
        stroke="url(#grad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
