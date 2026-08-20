import { ScrollView, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Badge,
  Card,
  Chip,
  GrowthStat,
  HeatStrip,
  LegendDot,
  PortalHeader,
  SectionHeading,
  StatPill,
} from '@/components';
import {
  attendance,
  attendanceSummary,
  diaryEntries,
  dueTotal,
  formatBdt,
  growth,
  invoices,
  linkedChild,
} from '@/lib/demo-data';
import { photos } from '@/lib/photos';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

const classPhoto = photos.honeyBees;

type Props = {
  readonly onSignOut: () => void;
};

export function PortalOverviewParent({ onSignOut }: Props) {
  const insets = useSafeAreaInsets();
  const summary = attendanceSummary(attendance);
  const totalDue = dueTotal(invoices);
  const todayStatus = attendance[0]?.status ?? 'present';

  const statusBadge = {
    present: { tone: 'leaf' as const, label: 'Present today' },
    absent: { tone: 'rose' as const, label: 'Absent today' },
    late: { tone: 'honey' as const, label: 'Late today' },
  }[todayStatus];

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
        {/* Child hero card */}
        <Card tone="white" style={{ overflow: 'hidden' }}>
          <Image
            source={classPhoto.source}
            accessibilityLabel={classPhoto.alt}
            style={{
              width: '100%',
              height: 180,
            }}
            resizeMode="cover"
          />
          <View style={{ padding: space.s5, gap: space.s3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, gap: space.s1 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.heading,
                    fontSize: text.xl,
                    color: colors.hive,
                  }}
                >
                  {linkedChild.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.body,
                    fontSize: text.sm,
                    color: colors.hiveSoft,
                  }}
                >
                  {linkedChild.className}{' \u00B7 '}{linkedChild.teacherName}
                </Text>
              </View>
              <Badge label={statusBadge.label} tone={statusBadge.tone} />
            </View>

            <View style={{ flexDirection: 'row', gap: space.s3, marginTop: space.s1 }}>
              <StatPill
                label="Today"
                value={
                  todayStatus === 'present'
                    ? '\u2705'
                    : todayStatus === 'late'
                      ? '\u23F0'
                      : '\u274C'
                }
              />
              <StatPill label="Diary" value={String(diaryEntries.length)} />
              <StatPill label="Due" value={formatBdt(totalDue)} />
            </View>
          </View>
        </Card>

        {/* Attendance */}
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="This week" title="Attendance" />
          <Card tone="white" style={{ padding: space.s4 }}>
            <HeatStrip records={attendance} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: space.s4,
                marginTop: space.s3,
              }}
            >
              <LegendDot color={colors.success} label={`${summary.present} present`} />
              <LegendDot color={colors.danger} label={`${summary.absent} absent`} />
              <LegendDot color={colors.honey} label={`${summary.late} late`} />
            </View>
          </Card>
        </View>

        {/* Growth */}
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Growth" title="Milestones & measurements" />
          <Card tone="white" style={{ padding: space.s5, gap: space.s4 }}>
            <View style={{ flexDirection: 'row', gap: space.s5 }}>
              <GrowthStat value={`${growth.heightCm} cm`} label="Height" />
              <GrowthStat value={`${growth.weightKg} kg`} label="Weight" />
              <GrowthStat value={growth.lastChecked.slice(5)} label="Checked" />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.s2 }}>
              {growth.milestones.map((m) => (
                <Chip key={m} label={m} tone="leafSoft" />
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
