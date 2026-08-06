export const colors = {
  cream: '#fffaf0',
  cream2: '#fff5dc',
  creamHover: '#fef6e3',
  hive: '#2a1f0c',
  hiveSoft: '#665738',
  hiveHover: '#1a1408',
  honey: '#f5a81c',
  honeyLight: '#ffc757',
  honeyDeep: '#c97800',
  honeyDeepHover: '#a86400',
  nectar: '#ffe8ac',
  leaf: '#5f8f4e',
  leafSoft: '#e9f3e3',
  leafHover: '#4a7a3d',
  sky: '#eaf4f8',
  rose: '#f7e2df',
  white: '#fff',
  danger: '#a43326',
  success: '#275e31',
  border: 'rgba(83,61,19,0.13)',
  hive2: '#3a2c14',
  skyDeep: '#cfe6f0',
  nectarSoft: '#fff4d6',
} as const;

export const space = {
  s0: 0,
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 24,
  s6: 32,
  s7: 48,
  s8: 64,
  s9: 96,
} as const;

export const text = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
  xxxxxl: 64,
} as const;

export const radius = 24 as const;
export const container = 1180 as const;

export const duration = {
  fast: 150,
  normal: 200,
  slow: 400,
} as const;

export const shadows = {
  shadow: '0 14px 38px rgba(104, 70, 8, 0.11)',
  shadowLg: '0 28px 70px rgba(104, 70, 8, 0.17)',
} as const;

export const breakpoints = {
  sm: 560,
  md: 820,
  lg: 1080,
} as const;

export const tokens = {
  colors,
  space,
  text,
  radius,
  container,
  duration,
  shadows,
  breakpoints,
} as const;

export type ColorToken = keyof typeof colors;
export type SpaceToken = keyof typeof space;
export type TextToken = keyof typeof text;
export type DurationToken = keyof typeof duration;
export type ShadowToken = keyof typeof shadows;
export type BreakpointToken = keyof typeof breakpoints;

export default tokens;
