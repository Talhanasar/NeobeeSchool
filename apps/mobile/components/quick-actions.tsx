import { Pressable, Text, View } from 'react-native';
import { colors, shadows, space } from '@/theme/tokens';
import { Icon, type IconName } from './icon';

type QuickAction = {
  readonly icon: IconName;
  readonly label: string;
  readonly onPress: () => void;
};

type QuickActionsProps = {
  readonly actions: readonly QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: space.s2 }}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
          style={({ pressed }) => ({
            flex: 1,
            minHeight: 44,
            alignItems: 'center',
            gap: space.s2,
            paddingVertical: space.s4,
            paddingHorizontal: space.s1,
            backgroundColor: colors.white,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
            boxShadow: shadows.shadow,
            borderCurve: 'continuous',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Icon name={action.icon} size={22} color={colors.honeyDeep} />
          <Text
            style={{
              fontFamily: 'Nunito_800ExtraBold',
              fontSize: 10,
              letterSpacing: 0.3,
              color: colors.hiveSoft,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export type { QuickAction };
