import { View, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { notices } from '@/lib/content';

type NoticeItem = (typeof notices)[number];

type NoticeCardProps = {
  readonly item: NoticeItem;
};

export function NoticeCard({ item }: NoticeCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: space.s4,
        alignItems: 'center',
        paddingVertical: space.s4,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        borderStyle: 'dashed',
      }}
    >
      <View
        style={{
          width: 60,
          minHeight: 59,
          borderRadius: 13,
          backgroundColor: colors.nectar,
          alignItems: 'center',
          justifyContent: 'center',
          padding: space.s2,
          gap: space.s1,
        }}
      >
        <Text
          style={{
            color: colors.hive,
            fontFamily: fontFamily.heading,
            fontSize: text.lg,
          }}
        >
          {item.day}
        </Text>
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: 'Nunito_900Black',
            fontSize: text.xs,
            textTransform: 'uppercase',
          }}
        >
          {item.month}
        </Text>
      </View>

      <View style={{ flex: 1, gap: space.s1 }}>
        <Text
          style={{
            color: colors.hive,
            fontFamily: 'Nunito_700Bold',
            fontSize: text.sm,
            lineHeight: text.sm * 1.4,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.xs,
            lineHeight: text.xs * 1.5,
          }}
        >
          {item.note}
        </Text>
      </View>
    </View>
  );
}
