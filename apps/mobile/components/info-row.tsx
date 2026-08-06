import { View, Text } from 'react-native';
import { colors, space, text as textSizes } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { Icon, type IconName } from './icon';

type InfoRowProps = {
  readonly icon: IconName;
  readonly title: string;
  readonly text?: string;
};

export function InfoRow({ icon, title, text }: InfoRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: space.s3, alignItems: 'flex-start' }}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: colors.sky,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={22} color={colors.honeyDeep} />
      </View>

      <View style={{ flex: 1, gap: space.s1, paddingVertical: space.s1 }}>
        <Text
          style={{
            color: colors.hive,
            fontFamily: 'Nunito_700Bold',
            fontSize: textSizes.base,
          }}
        >
          {title}
        </Text>
        {text ? (
          <Text
            style={{
              color: colors.hiveSoft,
              fontFamily: fontFamily.body,
              fontSize: textSizes.sm,
              lineHeight: textSizes.sm * 1.5,
            }}
          >
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
