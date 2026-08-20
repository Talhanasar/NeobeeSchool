import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Card,
  LegendDot,
  PortalHeader,
  SectionHeading,
  StatPill,
} from '@/components';
import { rosterSummary, teacherClass, teacherPersona } from '@/lib/demo-data';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

type Props = {
  readonly onSignOut: () => void;
};

export function PortalOverviewTeacher({ onSignOut }: Props) {
  const insets = useSafeAreaInsets();
  const summary = rosterSummary(teacherClass.roster);
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader title="Teacher Portal" subtitle={teacherClass.className} onSignOut={onSignOut} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: insets.bottom + space.s9,
          gap: space.s6,
        }}
      >
        <View style={{ gap: space.s1 }}>
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.sm,
              color: colors.hiveSoft,
            }}
          >
            Welcome back,
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.heading,
              fontSize: text.xxl,
              color: colors.hive,
              lineHeight: text.xxl * 1.1,
            }}
          >
            {teacherPersona.name}
          </Text>
        </View>

        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Today" title={teacherClass.className} />
          <Card tone="white" style={{ padding: space.s5, gap: space.s4 }}>
            <Text
              style={{
                fontFamily: fontFamily.body,
                fontSize: text.sm,
                color: colors.hiveSoft,
              }}
            >
              {teacherClass.room} · {teacherClass.roster.length} students
            </Text>
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
      </ScrollView>
    </View>
  );
}
