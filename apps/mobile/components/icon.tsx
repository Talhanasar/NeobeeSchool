import type { ReactNode } from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { IconName as ContentIconName } from '@/lib/content';

export type IconName = ContentIconName | 'home' | 'classes' | 'campus' | 'admissions' | 'chat';

type IconProps = {
  readonly name: IconName;
  readonly size?: number;
  readonly color?: ColorValue;
};

const paths: Record<IconName, ReactNode> = {
  book: <Path d="M4 5.5c3.2-.8 5.8-.2 8 1.7v12.3c-2.2-1.9-4.8-2.5-8-1.7V5.5Zm16 0c-3.2-.8-5.8-.2-8 1.7v12.3c2.2-1.9 4.8-2.5 8-1.7V5.5Z" />,
  heart: <Path d="M12 20S4 15.7 4 9.5C4 5 9.5 3.3 12 7c2.5-3.7 8-2 8 2.5C20 15.7 12 20 12 20Z" />,
  leaf: (
    <>
      <Path d="M19.5 4.5C11 4.5 5.5 8.4 5.5 14.2c0 3.1 2.4 5.3 5.4 5.3 6.1 0 8.6-6.1 8.6-15Z" />
      <Path d="M5 20c2.2-5.2 5.8-8.4 11-10.2" />
    </>
  ),
  blocks: (
    <>
      <Rect x="4" y="13" width="7" height="7" rx="1" />
      <Rect x="13" y="13" width="7" height="7" rx="1" />
      <Path d="m12 3 5 8H7l5-8Z" />
    </>
  ),
  language: (
    <>
      <Path d="M4 5h10M9 5c0 6-2 9-5 11m4-7c1 3 3 5 6 7m2-5 4 9m0-9-4 9m1.2-3h5.6" />
    </>
  ),
  moon: <Path d="M19.5 15.5A8 8 0 0 1 8.5 4.4 8 8 0 1 0 19.5 15.5Z" />,
  calendar: (
    <>
      <Rect x="3.5" y="5" width="17" height="15" rx="2" />
      <Path d="M8 3v4m8-4v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01" />
    </>
  ),
  play: (
    <>
      <Path d="M5 16c0-5 2.5-8 7-8s7 3 7 8" />
      <Path d="M7 16v2m10-2v2M9 8l-1-4m7 4 1-4M8 13h8M12 13v7" />
    </>
  ),
  shield: <Path d="M12 3 20 6v5c0 5.2-3.4 8.5-8 10-4.6-1.5-8-4.8-8-10V6l8-3Zm-3 9 2 2 4-5" />,
  camera: (
    <>
      <Rect x="3" y="7" width="18" height="12" rx="2" />
      <Circle cx="12" cy="13" r="3.5" />
      <Path d="m8 7 1-3h6l1 3" />
    </>
  ),
  firstAid: (
    <>
      <Rect x="4" y="6" width="16" height="14" rx="2" />
      <Path d="M9 6V4h6v2m-3 4v6m-3-3h6" />
    </>
  ),
  fire: <Path d="M13 3c1 5-4 5-2 9 1-2 3-2 4-4 3 3 4 7 2 10-2.5 3.8-9.5 3.2-11-1.4C4.8 13 7 10 9 8c0 3 1 3 1 3s-1-5 3-8Z" />,
  pickup: (
    <>
      <Circle cx="9" cy="8" r="3" />
      <Circle cx="17" cy="10" r="2.5" />
      <Path d="M3.5 20c.5-4.2 2.3-6 5.5-6s5 1.8 5.5 6m0-5c3-.2 4.8 1.5 5 5" />
    </>
  ),
  pin: (
    <>
      <Path d="M9 4h6l-.8 5 3.3 3H6.5l3.3-3L9 4Z" />
      <Path d="M12 12v9" />
    </>
  ),
  phone: <Path d="M7 3 4 5c0 8.3 6.7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2-3-5Z" />,
  mail: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Path d="m4 7 8 6 8-6" />
    </>
  ),
  location: (
    <>
      <Path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
      <Circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 7v5l3 2" />
    </>
  ),
  arrow: (
    <>
      <Path d="M5 12h14m-5-5 5 5-5 5" />
    </>
  ),
  check: <Path d="m5 12 4 4L19 6" />,
  home: (
    <>
      <Path d="M4 10.5 12 4l8 6.5" />
      <Path d="M6 9v10.5a.5.5 0 0 0 .5.5h4v-5h3v5h4a.5.5 0 0 0 .5-.5V9" />
    </>
  ),
  classes: (
    <>
      <Path d="M4 19.5V8.5l8-4 8 4v11" />
      <Path d="M12 4.5v15" />
      <Path d="M20 8.5 12 12 4 8.5" />
    </>
  ),
  campus: (
    <>
      <Path d="M12 3 4 8v12h16V8l-8-5Z" />
      <Path d="M9 20v-6h6v6" />
      <Path d="M12 11h.01" />
    </>
  ),
  admissions: (
    <>
      <Path d="M4 6h16v14a.5.5 0 0 1-.5.5h-15A.5.5 0 0 1 4 20V6Z" />
      <Path d="M8 6V4h8v2" />
      <Path d="M12 11v6" />
      <Path d="M9 14h6" />
    </>
  ),
  chat: <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
};

export function Icon({ name, size = 24, color = 'currentColor' }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </Svg>
  );
}
