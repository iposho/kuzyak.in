import React from 'react';

interface GraphLogicIconProps {
  className?: string;
  size?: number | string;
}

export const GraphLogicIcon: React.FC<GraphLogicIconProps> = ({
  className,
  size = '1.5rem',
}) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 192 192"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <g transform="translate(0,192) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M0 960 l0 -960 960 0 960 0 0 960 0 960 -960 0 -960 0 0 -960z m1023
378 c76 -38 97 -150 44 -230 -26 -38 -66 -48 -92 -22 -18 19 -17 46 6 101 20
49 -3 68 -79 66 -160 -4 -395 -169 -478 -338 -42 -85 -57 -182 -33 -211 16
-20 64 -12 128 21 60 30 207 138 195 142 -5 2 -42 -8 -81 -21 -40 -13 -81 -22
-93 -19 -31 8 -44 50 -26 78 34 52 402 139 503 120 46 -8 69 -54 54 -105 -14
-46 -124 -331 -134 -347 -19 -30 -97 -5 -97 31 0 8 25 78 55 157 30 79 55 145
55 146 0 16 -37 -11 -108 -78 -151 -143 -295 -232 -397 -244 -65 -8 -132 24
-157 75 -55 110 11 317 146 459 189 198 444 293 589 219z m339 -305 l3 -198
143 -3 142 -3 0 -84 0 -85 -247 2 -248 3 -3 270 c-1 148 0 275 3 282 3 9 33
13 104 13 l101 0 2 -197z"
      />
    </g>
  </svg>
);
