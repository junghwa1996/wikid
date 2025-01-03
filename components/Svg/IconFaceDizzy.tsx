import React from 'react';

export default function IconFaceDizzy({
  width = 32,
  height = 32,
  fill = 'currentColor',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
        transform="translate(0)"
      />
      <polygon points="24.41 11 23 9.59 21 11.59 19 9.59 17.59 11 19.59 13 17.59 15 19 16.41 21 14.41 23 16.41 24.41 15 22.41 13 24.41 11" />
      <polygon points="14.41 11 13 9.59 11 11.59 9 9.59 7.59 11 9.59 13 7.59 15 9 16.41 11 14.41 13 16.41 14.41 15 12.41 13 14.41 11" />
      <path d="M16,19a3,3,0,1,0,3,3,3,3,0,0,0-3-3Z" transform="translate(0)" />
      <rect fill="none" width="32" height="32" />
    </svg>
  );
}
