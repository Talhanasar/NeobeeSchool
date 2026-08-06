import { View, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';

type ChipTone = 'gold' | 'green' | 'blue' | 'rose' | 'leafSoft' | 'nectar' | 'sky';

const toneStyle: Record<ChipTone, { bg: string; fg: string }> = {
  gold: { bg: colors.nectar, fg: colors.hive },
  green: { bg: colors.leafSoft, fg: '#35632d' },
  blue: { bg: colors.sky, fg: '#2e566e' },
  rose: { bg: colors.rose, fg: '#9c3a28' },
  leafSoft: { bg: colors.leafSoft, fg: '#35632d' },
  nectar: { bg: colors.nectar, fg: colors.hive },
  sky: { bg: colors.sky, fg: '#2e566e' },
};

type ChipProps = {
  readonly label: string;
  readonly tone?: ChipTone;
};

export function Chip({ label, tone = 'leafSoft' }: ChipProps) {
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
          fontFamily: 'Nunito_600SemiBold',
          fontSize: text.xs,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
