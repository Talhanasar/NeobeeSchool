import { Pressable, Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { Icon } from './icon';
import { admissions } from '@/lib/content';

type AdmissionsBannerProps = {
  readonly onPress: () => void;
};

export function AdmissionsBanner({ onPress }: AdmissionsBannerProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Admissions open — start your inquiry"
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.s3,
        backgroundColor: colors.nectar,
        borderRadius: 14,
        paddingVertical: space.s3,
        paddingHorizontal: space.s4,
        minHeight: 44,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.honey,
        }}
      />
      <View style={{ flex: 1, gap: space.s1 }}>
        <Text
          style={{
            color: colors.honeyDeep,
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: text.xs,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
          }}
        >
          {`${admissions.statusLabel} · ${admissions.session}`}
        </Text>
        <Text
          style={{
            color: colors.hive,
            fontFamily: fontFamily.body,
            fontSize: text.xs,
            lineHeight: text.xs * 1.45,
          }}
        >
          {admissions.lead}
        </Text>
      </View>
      <Icon name="arrow" size={20} color={colors.honeyDeep} />
    </Pressable>
  );
}
