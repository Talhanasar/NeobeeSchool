import { View, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { dailyRhythm } from '@/lib/content';

type RhythmItem = (typeof dailyRhythm)[number];

type TimelineRowProps = {
  readonly item: RhythmItem;
  readonly isLast: boolean;
};

export function TimelineRow({ item, isLast }: TimelineRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: space.s4, paddingVertical: space.s3 }}>
      <View style={{ width: 56, alignItems: 'center', gap: space.s1 }}>
        <Text
          style={{
            color: colors.honeyDeep,
            fontFamily: fontFamily.heading,
            fontSize: text.base,
          }}
        >
          {item.time}
        </Text>
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: colors.border,
              borderRadius: 1,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1, gap: space.s1, paddingBottom: isLast ? 0 : space.s4 }}>
        <Text
          style={{
            color: colors.hive,
            fontFamily: 'Nunito_700Bold',
            fontSize: text.base,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.sm,
            lineHeight: text.sm * 1.6,
          }}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
}
