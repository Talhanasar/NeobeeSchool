import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { Card } from './card';
import type { DiaryEntry, Mood } from '@/lib/demo-data';

const moodEmoji: Record<Mood, string> = {
  happy: '\u{1F60A}',
  calm: '\u{1F60C}',
  tired: '\u{1F634}',
  playful: '\u{1F61C}',
  thoughtful: '\u{1F914}',
};

type DiaryCardProps = {
  readonly entry: DiaryEntry;
};

export function DiaryCard({ entry }: DiaryCardProps) {
  const date = new Date(entry.date + 'T00:00:00');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });

  return (
    <Card tone="white" style={{ padding: space.s4, gap: space.s3 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s3 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: colors.nectarSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: 'Nunito_900Black', fontSize: text.lg, color: colors.honeyDeep }}>
              {dayNum}
            </Text>
          </View>
          <View>
            <Text style={{ fontFamily: fontFamily.heading, fontSize: text.base, color: colors.hive }}>
              {dayName}, {month} {dayNum}
            </Text>
            <Text style={{ fontFamily: fontFamily.body, fontSize: text.xs, color: colors.hiveSoft }}>
              {moodEmoji[entry.mood]} Feeling {entry.mood}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: space.s2 }}>
        <InfoLine label="Meals" value={entry.meals} />
        <InfoLine label="Nap" value={entry.nap} />
        <InfoLine label="Activities" value={entry.activities} />
      </View>

      {entry.note ? (
        <View
          style={{
            backgroundColor: colors.cream,
            borderRadius: 12,
            padding: space.s3,
            borderLeftWidth: 3,
            borderLeftColor: colors.honey,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.sm,
              color: colors.hiveSoft,
              lineHeight: text.sm * 1.5,
              fontStyle: 'italic',
            }}
          >
            {entry.note}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

function InfoLine({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: space.s2 }}>
      <Text
        style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: text.xs,
          color: colors.honeyDeep,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          width: 72,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          flex: 1,
          fontFamily: fontFamily.body,
          fontSize: text.sm,
          color: colors.hiveSoft,
          lineHeight: text.sm * 1.4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
