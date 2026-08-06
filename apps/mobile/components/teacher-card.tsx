import { View, Text, type ViewStyle } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { teachers } from '@/lib/content';
import { Card } from './card';

type TeacherItem = (typeof teachers)[number];

type TeacherCardProps = {
  readonly item: TeacherItem;
};

const avatarGradient: ViewStyle = {
  experimental_backgroundImage: `linear-gradient(135deg, ${colors.honey}, ${colors.nectar})`,
} as ViewStyle;

export function TeacherCard({ item }: TeacherCardProps) {
  return (
    <Card tone="white" style={{ padding: space.s6 }}>
      <View style={{ alignItems: 'center', gap: space.s3 }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            borderWidth: 5,
            borderColor: colors.cream2,
            backgroundColor: colors.nectar,
            alignItems: 'center',
            justifyContent: 'center',
            ...avatarGradient,
          }}
        >
          <Text
            style={{
              color: colors.hive,
              fontFamily: fontFamily.heading,
              fontSize: text.xxl,
            }}
          >
            {item.initials}
          </Text>
        </View>

        <View style={{ alignItems: 'center', gap: space.s1 }}>
          <Text
            style={{
              color: colors.hive,
              fontFamily: 'Nunito_700Bold',
              fontSize: text.lg,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: colors.honeyDeep,
              fontFamily: 'Nunito_900Black',
              fontSize: text.xs,
              letterSpacing: 0.7,
              textTransform: 'uppercase',
            }}
          >
            {item.role}
          </Text>
          <Text
            style={{
              color: colors.hiveSoft,
              fontFamily: fontFamily.body,
              fontSize: text.sm,
              textAlign: 'center',
            }}
          >
            {item.detail}
          </Text>
        </View>
      </View>
    </Card>
  );
}
