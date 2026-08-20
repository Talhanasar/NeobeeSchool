import { Image, View, Text } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { classes } from '@/lib/content';
import { Card } from './card';
import { Chip } from './chip';

type ClassItem = (typeof classes)[number];

type ClassCardProps = {
  readonly item: ClassItem;
  readonly image?: ImageSourcePropType;
  readonly imageAspectRatio?: number;
};

const colorMap: Record<
  ClassItem['color'],
  { border: string; chipTone: 'gold' | 'green' | 'blue' | 'rose' }
> = {
  gold: { border: colors.honey, chipTone: 'gold' },
  green: { border: colors.leaf, chipTone: 'green' },
  blue: { border: colors.skyDeep, chipTone: 'blue' },
  rose: { border: colors.rose, chipTone: 'rose' },
};

export function ClassCard({ item, image, imageAspectRatio }: ClassCardProps) {
  const accent = colorMap[item.color];

  return (
    <Card
      tone="white"
      style={{ overflow: 'hidden', borderTopWidth: 5, borderTopColor: accent.border }}
    >
      {image ? (
        <Image
          source={image}
          accessibilityLabel={`${item.name} class`}
          style={{
            width: '100%',
            // ponytail: fixed 220dp band, centre-cropped. Upgrade when the class photos get re-shot landscape.
            height: 220,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          resizeMode="cover"
        />
      ) : null}
      <View style={{ padding: space.s6, gap: space.s3 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: space.s2,
          }}
        >
          <Text
            style={{
              color: colors.hive,
              fontFamily: fontFamily.heading,
              fontSize: text.xl,
              lineHeight: text.xl * 1.14,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              backgroundColor: colors.hive,
              borderRadius: 999,
              paddingVertical: 5,
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                color: colors.honey,
                fontFamily: 'Nunito_900Black',
                fontSize: text.xs,
                letterSpacing: 0.7,
                textTransform: 'uppercase',
              }}
            >
              {item.age}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: colors.honeyDeep,
            fontFamily: 'Nunito_900Black',
            fontSize: text.xs,
            letterSpacing: 0.9,
            textTransform: 'uppercase',
          }}
        >
          {item.tagline}
        </Text>

        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.sm,
            lineHeight: text.sm * 1.6,
          }}
        >
          {item.description}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.s2 }}>
          {item.skills.map((skill) => (
            <Chip key={skill} label={skill} tone={accent.chipTone} />
          ))}
        </View>
      </View>
    </Card>
  );
}
