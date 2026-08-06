import { ScrollView, View } from 'react-native';
import { colors, space } from '@/theme/tokens';
import { SectionHeading, ClassCard, InfoRow, Card } from '@/components';
import { classes, curriculum } from '@/lib/content';

export default function ClassesScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.cream }}
      contentContainerStyle={{
        paddingHorizontal: space.s5,
        paddingTop: space.s5,
        paddingBottom: space.s9,
        gap: space.s7,
      }}
    >
      <View style={{ gap: space.s5 }}>
        <SectionHeading
          eyebrow="Our classes"
          title="Four classes, one joyful journey"
          subtitle="Every level is designed around what children are ready to explore now, with short activities, familiar rhythms, and plenty of movement."
        />
        <View style={{ gap: space.s5 }}>
          {classes.map((item) => (
            <ClassCard key={item.name} item={item} />
          ))}
        </View>
      </View>

      <View style={{ gap: space.s5 }}>
        <SectionHeading
          eyebrow="Learning approach"
          title="World-ready methods for little learners"
          subtitle="A clear, balanced foundation delivered with warmth, repetition, and play — never pressure."
        />
        <Card tone="cream" style={{ padding: space.s5, gap: space.s4 }}>
          {curriculum.map((item) => (
            <InfoRow
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}
