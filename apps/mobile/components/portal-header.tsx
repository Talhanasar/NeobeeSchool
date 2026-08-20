import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { Icon } from './icon';
import { BrandMark } from './brand-mark';

type PortalHeaderProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly onSignOut?: () => void;
};

export function PortalHeader({ title, subtitle, onSignOut }: PortalHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + space.s2,
        paddingBottom: space.s3,
        paddingHorizontal: space.s5,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.s3,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => router.back()}
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.cream,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Icon name="back" size={20} color={colors.hive} />
      </Pressable>

      <View style={{ flex: 1, gap: 1 }}>
        <Text
          style={{
            fontFamily: fontFamily.heading,
            fontSize: text.lg,
            color: colors.hive,
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.xs,
              color: colors.hiveSoft,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {onSignOut ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          onPress={onSignOut}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.cream,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Icon name="logout" size={20} color={colors.hive} />
        </Pressable>
      ) : null}

      <BrandMark size={32} />
    </View>
  );
}
