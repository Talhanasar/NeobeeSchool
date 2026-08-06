import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/theme/tokens';

type BeeMarkProps = {
  readonly size?: number;
};

export function BeeMark({ size = 56 }: BeeMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        d="M19 19c-5-7-12-5-11 1 1 5 7 6 12 4m9-5c5-7 12-5 11 1-1 5-7 6-12 4"
        fill="#f8fdff"
        stroke={colors.hive}
        strokeWidth={2}
      />
      <Path
        d="M14 28c0-8 4-13 10-13s10 5 10 13-4 13-10 13-10-5-10-13Z"
        fill={colors.honey}
        stroke={colors.hive}
        strokeWidth={2}
      />
      <Path d="M16 23h16M15 30h18" fill="none" stroke={colors.hive} strokeWidth={3} />
      <Path
        d="m24 41 3-4h-6l3 4ZM20 14l-3-4m11 4 3-4"
        fill="none"
        stroke={colors.hive}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={17} cy={9} r={2} fill={colors.hive} />
      <Circle cx={31} cy={9} r={2} fill={colors.hive} />
    </Svg>
  );
}
