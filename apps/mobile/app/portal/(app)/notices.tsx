import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, PortalHeader, SectionHeading } from '@/components';
import { linkedChild, portalNotices, teacherClass } from '@/lib/demo-data';
import { useSession } from '@/lib/session';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

export default function NoticesScreen() {
  const insets = useSafeAreaInsets();
  const { role, signOut } = useSession();
  const router = useRouter();
  const subtitle = role === 'teacher' ? teacherClass.className : linkedChild.name;

  const onSignOut = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader
        title={role === 'teacher' ? 'Teacher Portal' : 'Parent Portal'}
        subtitle={subtitle}
        onSignOut={onSignOut}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: insets.bottom + space.s9,
          gap: space.s6,
        }}
      >
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Stay updated" title="Notices" />
          <Card tone="white" style={{ paddingHorizontal: space.s5 }}>
            {portalNotices.map((n) => (
              <View
                key={n.id}
                style={{
                  paddingVertical: space.s3,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  gap: space.s1,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s2 }}>
                  <View
                    style={{
                      backgroundColor: colors.nectarSoft,
                      borderRadius: 999,
                      paddingHorizontal: space.s2,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Nunito_800ExtraBold',
                        fontSize: 10,
                        color: colors.honeyDeep,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      {n.tag}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fontFamily.body,
                      fontSize: text.xs,
                      color: colors.hiveSoft,
                    }}
                  >
                    {n.date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito_700Bold',
                    fontSize: text.sm,
                    color: colors.hive,
                  }}
                >
                  {n.title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.body,
                    fontSize: text.xs,
                    color: colors.hiveSoft,
                    lineHeight: text.xs * 1.5,
                  }}
                >
                  {n.body}
                </Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
