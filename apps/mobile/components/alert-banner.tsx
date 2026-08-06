import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';

type AlertBannerProps = {
  readonly label: string;
};

export function AlertBanner({ label }: AlertBannerProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.s2,
        backgroundColor: colors.rose,
        borderRadius: 14,
        paddingVertical: space.s3,
        paddingHorizontal: space.s4,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.danger,
        }}
      />
      <Text
        style={{
          flex: 1,
          color: colors.danger,
          fontFamily: 'Nunito_800ExtraBold',
          fontSize: text.xs,
          lineHeight: text.xs * 1.45,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
