import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, InvoiceRow, PortalHeader, SectionHeading } from '@/components';
import { dueTotal, formatBdt, invoices, linkedChild } from '@/lib/demo-data';
import { useSession } from '@/lib/session';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

export default function FeesScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  const router = useRouter();
  const totalDue = dueTotal(invoices);

  const onSignOut = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader title="Parent Portal" subtitle={linkedChild.name} onSignOut={onSignOut} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: insets.bottom + space.s9,
          gap: space.s6,
        }}
      >
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Fees" title="Invoices" />
          <Card tone="white" style={{ padding: space.s4, gap: space.s2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: fontFamily.body,
                  fontSize: text.sm,
                  color: colors.hiveSoft,
                }}
              >
                Total due
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito_800ExtraBold',
                  fontSize: text.base,
                  color: colors.hive,
                }}
              >
                {formatBdt(totalDue)}
              </Text>
            </View>
          </Card>
          <Card tone="white" style={{ paddingHorizontal: space.s4 }}>
            {invoices.map((inv) => (
              <InvoiceRow key={inv.id} invoice={inv} />
            ))}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
