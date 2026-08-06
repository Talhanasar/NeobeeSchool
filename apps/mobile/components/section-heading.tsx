import { View, Text, useWindowDimensions } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

type SectionHeadingProps = {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  const { width } = useWindowDimensions();
  const titleSize = width < 560 ? text.xxl : text.xxxl;

  return (
    <View accessibilityRole="header" style={{ gap: space.s2 }}>
      {eyebrow ? (
        <Text
          style={{
            color: colors.honeyDeep,
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: text.xs,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Text>
      ) : null}
      <Text
        style={{
          color: colors.hive,
          fontFamily: fontFamily.heading,
          fontSize: titleSize,
          letterSpacing: -0.5,
          lineHeight: titleSize * 1.14,
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.base,
            lineHeight: text.base * 1.65,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
