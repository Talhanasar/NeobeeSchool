import { Linking, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { BrandMark } from './brand-mark';
import { Icon } from './icon';
import { contact } from '@/lib/content';

export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.cream,
        paddingTop: insets.top,
        paddingHorizontal: space.s5,
        paddingBottom: space.s3,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: space.s3,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: space.s3,
          }}
        >
          <BrandMark size={40} />
          <View style={{ gap: 0 }}>
            <Text
              style={{
                fontFamily: fontFamily.heading,
                fontSize: text.lg,
                color: colors.hive,
                lineHeight: text.lg * 1.1,
              }}
            >
              Neobee
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito_800ExtraBold',
                fontSize: 9,
                letterSpacing: 1.5,
                color: colors.honeyDeep,
              }}
            >
              INTERNATIONAL SCHOOL
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Call Neobee International School"
          onPress={() => Linking.openURL(`tel:+${contact.phone.replace(/\D/g, '')}`)}
          style={({ pressed }) => ({
            width: 42,
            height: 42,
            borderRadius: 21,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.hive,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Icon name="phone" size={18} color={colors.nectar} />
        </Pressable>
      </View>
    </View>
  );
}
