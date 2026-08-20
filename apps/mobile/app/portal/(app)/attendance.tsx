import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Badge,
  Card,
  LegendDot,
  PortalHeader,
  SectionHeading,
  StatPill,
} from '@/components';
import { rosterSummary, teacherClass } from '@/lib/demo-data';
import { useSession } from '@/lib/session';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

const statusBadge: Record<
  'present' | 'absent' | 'late',
  { readonly label: string; readonly tone: 'leaf' | 'honey' | 'rose' }
> = {
  present: { label: 'Present', tone: 'leaf' },
  absent: { label: 'Absent', tone: 'rose' },
  late: { label: 'Late', tone: 'honey' },
};

export default function AttendanceScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  const router = useRouter();
  const summary = rosterSummary(teacherClass.roster);

  const onSignOut = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader title="Teacher Portal" subtitle="Today" onSignOut={onSignOut} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: insets.bottom + space.s9,
          gap: space.s6,
        }}
      >
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Summary" title={teacherClass.className} />
          <Card tone="white" style={{ padding: space.s5, gap: space.s4 }}>
            <View style={{ flexDirection: 'row', gap: space.s3 }}>
              <StatPill label="Present" value={String(summary.present)} />
              <StatPill label="Absent" value={String(summary.absent)} />
              <StatPill label="Late" value={String(summary.late)} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: space.s4 }}>
              <LegendDot color={colors.success} label={`${summary.present} present`} />
              <LegendDot color={colors.danger} label={`${summary.absent} absent`} />
              <LegendDot color={colors.honey} label={`${summary.late} late`} />
            </View>
          </Card>
        </View>

        <View style={{ gap: space.s3 }}>
          <SectionHeading eyebrow="By student" title="Today" />
          {teacherClass.roster.map((entry) => (
            <Card key={entry.student.id} tone="white" style={{ padding: space.s4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s3 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: colors.nectarSoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Nunito_800ExtraBold',
                      fontSize: text.sm,
                      color: colors.honeyDeep,
                    }}
                  >
                    {entry.student.initials}
                  </Text>
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      fontFamily: 'Nunito_700Bold',
                      fontSize: text.sm,
                      color: colors.hive,
                    }}
                  >
                    {entry.student.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.body,
                      fontSize: text.xs,
                      color: colors.hiveSoft,
                    }}
                  >
                    {entry.student.guardianName} · {entry.student.relation}
                  </Text>
                </View>
                <Badge
                  label={statusBadge[entry.today].label}
                  tone={statusBadge[entry.today].tone}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
