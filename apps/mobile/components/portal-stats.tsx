import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

export function StatPill({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.cream,
        borderRadius: 12,
        paddingVertical: space.s2,
        paddingHorizontal: space.s3,
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Text style={{ fontFamily: 'Nunito_800ExtraBold', fontSize: text.base, color: colors.hive }}>
        {value}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.body,
          fontSize: 10,
          color: colors.hiveSoft,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export function LegendDot({ color, label }: { readonly color: string; readonly label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s1 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
      <Text style={{ fontFamily: fontFamily.body, fontSize: text.xs, color: colors.hiveSoft }}>
        {label}
      </Text>
    </View>
  );
}

export function GrowthStat({ value, label }: { readonly value: string; readonly label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
      <Text
        style={{
          fontFamily: fontFamily.heading,
          fontSize: text.xl,
          color: colors.hive,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.body,
          fontSize: text.xs,
          color: colors.hiveSoft,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
