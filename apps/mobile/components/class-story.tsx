import { Pressable, Text } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

type ClassStoryTone = 'gold' | 'green' | 'blue' | 'rose';

type ClassStoryProps = {
  readonly name: string;
  readonly age: string;
  readonly tone: ClassStoryTone;
  readonly onPress: () => void;
};

const toneBackground: Record<ClassStoryTone, string> = {
  gold: colors.nectar,
  green: colors.leafSoft,
  blue: colors.sky,
  rose: colors.rose,
};

export function ClassStory({ name, age, tone, onPress }: ClassStoryProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${age}`}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 132,
        borderRadius: 20,
        borderCurve: 'continuous',
        padding: space.s4,
        gap: space.s1,
        backgroundColor: toneBackground[tone],
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'flex-end',
        minHeight: 104,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        style={{
          fontFamily: fontFamily.heading,
          fontSize: text.base,
          color: colors.hive,
        }}
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: text.xs,
          color: colors.hiveSoft,
        }}
      >
        {age}
      </Text>
    </Pressable>
  );
}
