import { type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, shadows } from '@/theme/tokens';

type CardTone = 'white' | 'cream' | 'nectar' | 'sky' | 'leafSoft' | 'rose';

const toneBackground: Record<CardTone, string> = {
  white: colors.white,
  cream: colors.cream,
  nectar: colors.nectar,
  sky: colors.sky,
  leafSoft: colors.leafSoft,
  rose: colors.rose,
};

type CardProps = {
  readonly children: ReactNode;
  readonly tone?: CardTone;
  readonly elevated?: boolean;
  readonly style?: StyleProp<ViewStyle>;
};

export function Card({ children, tone = 'white', elevated = false, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: toneBackground[tone],
          borderRadius: radius,
          borderWidth: 1,
          borderColor: colors.border,
          borderCurve: 'continuous',
          boxShadow: elevated ? shadows.shadowLg : shadows.shadow,
        } as ViewStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}
