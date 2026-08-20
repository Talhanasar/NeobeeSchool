import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, text } from '@/theme/tokens';
import { Icon } from './icon';

type Role = 'teacher' | 'parent';

const menuItems: readonly { readonly role: Role; readonly label: string; readonly icon: 'teacher' | 'heart' }[] = [
  { role: 'teacher', label: 'Teacher', icon: 'teacher' },
  { role: 'parent', label: 'Parent', icon: 'heart' },
];

export function LoginMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onSelect = (role: Role) => {
    close();
    router.push(`/portal/login?role=${role}`);
  };

  // Header height approximation: insets.top + vertical padding (s3 bottom + content ~28) + horizontal padding cluster
  const headerOffset = insets.top + 56;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Login"
        accessibilityState={{ expanded: isOpen }}
        onPress={open}
        hitSlop={8}
        style={({ pressed }) => ({
          minHeight: 44,
          minWidth: 44,
          paddingVertical: space.s2,
          paddingHorizontal: space.s4,
          borderRadius: 999,
          backgroundColor: colors.honey,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: space.s1,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text
          style={{
            color: colors.hive,
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: text.sm,
          }}
        >
          Login
        </Text>
        <Text
          style={{
            color: colors.hive,
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: 10,
            marginTop: -2,
          }}
        >
          v
        </Text>
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={isOpen}
        onRequestClose={close}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close login menu"
          onPress={close}
          style={{
            flex: 1,
            backgroundColor: 'rgba(42,31,12,0.35)',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: headerOffset,
              right: space.s5,
              minWidth: 200,
              backgroundColor: colors.white,
              borderRadius: 16,
              borderCurve: 'continuous',
              borderWidth: 1,
              borderColor: colors.border,
              boxShadow: '0 28px 70px rgba(104, 70, 8, 0.17)',
              paddingVertical: space.s2,
            }}
            onStartShouldSetResponder={() => true}
          >
            {menuItems.map((item, index) => (
              <View key={item.role}>
                <Pressable
                  accessibilityRole="menuitem"
                  accessibilityLabel={`Log in as ${item.label}`}
                  onPress={() => onSelect(item.role)}
                  style={({ pressed }) => ({
                    minHeight: 48,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: space.s3,
                    paddingHorizontal: space.s4,
                    paddingVertical: space.s2,
                    backgroundColor: pressed ? colors.creamHover : 'transparent',
                  })}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: colors.cream,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name={item.icon} size={16} color={colors.hive} />
                  </View>
                  <Text
                    style={{
                      color: colors.hive,
                      fontFamily: 'Nunito_700Bold',
                      fontSize: text.sm,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
                {index < menuItems.length - 1 ? (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.border,
                      marginHorizontal: space.s4,
                    }}
                  />
                ) : null}
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
