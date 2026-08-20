import { ScrollView, Text, View, Pressable, Linking, type ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, shadows, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import {
  AdmissionsBanner,
  BrandMark,
  Button,
  Card,
  ClassStory,
  Icon,
  NoticeCard,
  QuickActions,
  SectionHeading,
  StatCard,
  TimelineRow,
  type QuickAction,
} from '@/components';
import { classes, contact, dailyRhythm, notices, stats } from '@/lib/content';
import { photos } from '@/lib/photos';

const heroGradient: ViewStyle = {
  experimental_backgroundImage: `linear-gradient(150deg, ${colors.hive} 0%, ${colors.hive2} 100%)`,
} as ViewStyle;

export default function HomeScreen() {
  const router = useRouter();

  const actions: readonly QuickAction[] = [
    {
      icon: 'phone',
      label: 'Call',
      onPress: () => Linking.openURL(`tel:+${contact.phone.replace(/\D/g, '')}`),
    },
    {
      icon: 'chat',
      label: 'Message',
      onPress: () => Linking.openURL(`sms:+${contact.phone.replace(/\D/g, '')}`),
    },
    {
      icon: 'location',
      label: 'Visit',
      onPress: () => router.push('/campus'),
    },
    {
      icon: 'admissions',
      label: 'Apply',
      onPress: () => router.push('/admissions'),
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.cream }}
      contentContainerStyle={{
        paddingHorizontal: space.s5,
        paddingTop: space.s5,
        paddingBottom: space.s9,
        gap: space.s6,
      }}
    >
      <AdmissionsBanner onPress={() => router.push('/admissions')} />

      <View
        style={{
          borderRadius: radius,
          borderCurve: 'continuous',
          padding: space.s6,
          gap: space.s4,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: colors.hive,
          ...heroGradient,
          boxShadow: shadows.shadowLg,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            right: -38,
            top: -38,
            width: 150,
            height: 150,
            opacity: 0.16,
          }}
        >
          <BrandMark size={150} />
        </View>

        <View style={{ gap: space.s4 }}>
          <Text
            style={{
              fontFamily: 'Nunito_800ExtraBold',
              fontSize: text.xs,
              letterSpacing: 1.6,
              color: colors.honey,
            }}
          >
            AGES 2–6 · PANCHLAISH, CHATTOGRAM
          </Text>

          <Text
            style={{
              fontFamily: fontFamily.heading,
              fontSize: text.xxl,
              color: colors.white,
              lineHeight: text.xxl * 1.18,
              letterSpacing: -0.4,
            }}
          >
            Where little bees learn to fly
          </Text>

          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.sm,
              color: colors.nectarSoft,
              lineHeight: text.sm * 1.6,
              maxWidth: 280,
            }}
          >
            A warm, play-based preschool blending an international early-years pathway with Bangla
            learning and Islamic values.
          </Text>
        </View>

        <Button label="Reserve a seat" onPress={() => router.push('/admissions')} />
      </View>

      <QuickActions actions={actions} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open Parent Portal"
        onPress={() => router.push('/portal/login')}
        style={({ pressed }) => ({
          backgroundColor: colors.white,
          borderRadius: radius,
          borderCurve: 'continuous',
          padding: space.s5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.s4,
          borderWidth: 1,
          borderColor: colors.border,
          boxShadow: shadows.shadow,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.nectarSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="portal" size={24} color={colors.honeyDeep} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              fontFamily: fontFamily.heading,
              fontSize: text.base,
              color: colors.hive,
            }}
          >
            Parent Portal
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.xs,
              color: colors.hiveSoft,
            }}
          >
            View your child&apos;s day, attendance & diary
          </Text>
        </View>
        <Icon name="arrow" size={20} color={colors.honeyDeep} />
      </Pressable>

      <SectionHeading eyebrow="Four classes" title="Find your child's class" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: space.s3,
          paddingRight: space.s5,
          paddingVertical: space.s1,
        }}
        style={{ marginHorizontal: -space.s5, paddingHorizontal: space.s5 }}
      >
        {classes.map((item) => (
          <ClassStory
            key={item.name}
            name={item.name}
            age={item.age}
            tone={item.color}
            image={photos[item.photoKey].source}
            onPress={() => router.push('/classes')}
          />
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.s3 }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </View>

      <View style={{ gap: space.s5 }}>
        <SectionHeading
          eyebrow="A day at Neobee"
          title="A gentle rhythm for busy little hands"
          subtitle="Predictable routines help young children feel secure. Activities stay short, varied, and matched to early attention spans."
        />
        <Card tone="white" style={{ paddingHorizontal: space.s5, paddingVertical: space.s2 }}>
          {dailyRhythm.map((item, index) => (
            <TimelineRow
              key={item.time}
              item={item}
              isLast={index === dailyRhythm.length - 1}
              image={'photoKey' in item ? photos[item.photoKey].source : undefined}
            />
          ))}
        </Card>
      </View>

      <View style={{ gap: space.s5 }}>
        <SectionHeading eyebrow="Stay updated" title="Notices from the hive" />
        <Card tone="white" style={{ paddingHorizontal: space.s5 }}>
          {notices.slice(0, 3).map((item) => (
            <NoticeCard key={item.title} item={item} />
          ))}
        </Card>
        <Button
          label="See all notices"
          variant="secondary"
          onPress={() => router.push('/admissions')}
        />
      </View>
    </ScrollView>
  );
}
