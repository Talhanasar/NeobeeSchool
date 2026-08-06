import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { Icon, type IconName } from './icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly icon?: IconName;
};

const variantStyles: Record<
  ButtonVariant,
  { bg: string; color: string; border: string; shadow?: string }
> = {
  primary: {
    bg: colors.honey,
    color: colors.hive,
    border: 'transparent',
    shadow: '0 8px 20px rgba(197, 125, 0, 0.22)',
  },
  secondary: {
    bg: 'transparent',
    color: colors.hive,
    border: colors.hive,
  },
  ghost: {
    bg: 'transparent',
    color: colors.honeyDeep,
    border: 'transparent',
  },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const v = variantStyles[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: space.s2,
        paddingVertical: space.s3,
        paddingHorizontal: space.s5,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: v.border,
        backgroundColor: v.bg,
        boxShadow: variant === 'primary' && !isDisabled ? v.shadow : undefined,
        opacity: isDisabled ? 0.55 : pressed ? 0.85 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={v.color} size="small" />
      ) : (
        <>
          {icon ? <Icon name={icon} size={18} color={v.color} /> : null}
          <Text
            style={{
              color: v.color,
              fontFamily: 'Nunito_800ExtraBold',
              fontSize: text.sm,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
