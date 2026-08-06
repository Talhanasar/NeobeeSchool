import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

type StatCardProps = {
  readonly value: string;
  readonly label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <View
      style={{
        flexGrow: 1,
        flexBasis: '47%',
        backgroundColor: colors.nectarSoft,
        borderRadius: 18,
        borderCurve: 'continuous',
        paddingVertical: space.s4,
        paddingHorizontal: space.s4,
        gap: space.s1,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.heading,
          fontSize: text.xxl,
          color: colors.hive,
          lineHeight: text.xxl * 1.1,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: text.xs,
          color: colors.hiveSoft,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
