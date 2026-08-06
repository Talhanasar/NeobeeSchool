import { View, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';

type BadgeTone = 'honey' | 'leaf' | 'sky' | 'rose';

const toneStyle: Record<BadgeTone, { bg: string; fg: string }> = {
  honey: { bg: colors.nectar, fg: '#7a5200' },
  leaf: { bg: colors.leafSoft, fg: '#37622a' },
  sky: { bg: colors.sky, fg: '#2e566e' },
  rose: { bg: colors.rose, fg: '#9c3a28' },
};

type BadgeProps = {
  readonly label: string;
  readonly tone?: BadgeTone;
};

export function Badge({ label, tone = 'honey' }: BadgeProps) {
  const { bg, fg } = toneStyle[tone];

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bg,
        borderRadius: 999,
        paddingVertical: space.s1,
        paddingHorizontal: space.s2,
      }}
    >
      <Text
        style={{
          color: fg,
          fontFamily: 'Nunito_800ExtraBold',
          fontSize: text.xs,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
