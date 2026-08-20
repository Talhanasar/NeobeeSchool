import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import type { AttendanceRecord, AttendanceStatus } from '@/lib/demo-data';

const statusColor: Record<AttendanceStatus, string> = {
  present: colors.success,
  absent: colors.danger,
  late: colors.honey,
};

const statusLabel: Record<AttendanceStatus, string> = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
};

type HeatStripProps = {
  readonly records: readonly AttendanceRecord[];
};

export function HeatStrip({ records }: HeatStripProps) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={{ gap: space.s3 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {records.map((record) => {
          const date = new Date(record.date + 'T00:00:00');
          const dayLabel = dayNames[date.getDay()];
          return (
            <View key={record.date} style={{ alignItems: 'center', gap: space.s1 }}>
              <View
                accessible={true}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: statusColor[record.status],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                accessibilityLabel={`${dayLabel}: ${statusLabel[record.status]}`}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontSize: 10,
                  }}
                >
                  {record.status === 'present' ? 'P' : record.status === 'absent' ? 'A' : 'L'}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.hiveSoft,
                  fontFamily: fontFamily.body,
                  fontSize: 10,
                }}
              >
                {dayLabel}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
