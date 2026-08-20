import { useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import {
  Button,
  Card,
  SectionHeading,
  NoticeCard,
  InquiryForm,
} from '@/components';
import { admissions, admissionSteps, classes, notices } from '@/lib/content';

export default function AdmissionsScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const inquiryY = useRef(0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.cream }}
      behavior={process.env.EXPO_OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.cream }}
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: space.s9,
          gap: space.s7,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Card tone="white" style={{ padding: space.s5, gap: space.s3, backgroundColor: colors.nectarSoft }}>
          <Text style={{ color: colors.honeyDeep, fontFamily: 'Nunito_800ExtraBold', fontSize: text.xs, letterSpacing: 2, textTransform: 'uppercase' }}>
            {admissions.statusLabel}
          </Text>
          <Text style={{ color: colors.hive, fontFamily: fontFamily.heading, fontSize: text.xxl, lineHeight: text.xxl * 1.14 }}>
            {admissions.headline}
          </Text>
          <Text style={{ color: colors.hiveSoft, fontFamily: fontFamily.body, fontSize: text.base, lineHeight: text.base * 1.6 }}>
            {admissions.lead}
          </Text>
          <Button label={admissions.ctaLabel} onPress={() => scrollRef.current?.scrollTo({ y: Math.max(0, inquiryY.current - 24), animated: true })} />
        </Card>

        <View style={{ gap: space.s3 }}>
          <SectionHeading eyebrow="Find the right class" title="A class for every age" subtitle="Four levels move at the pace your child is ready for." />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.s2 }}>
            {classes.map((item) => (
              <View key={item.name} style={{ flexDirection: 'row', alignItems: 'center', gap: space.s2, backgroundColor: colors.white, borderRadius: 999, paddingVertical: space.s2, paddingHorizontal: space.s4, borderWidth: 1, borderColor: colors.border }}>
                <Text style={{ color: colors.honeyDeep, fontFamily: 'Nunito_800ExtraBold', fontSize: text.xs, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  {item.age}
                </Text>
                <Text style={{ color: colors.hiveSoft, fontSize: text.xs }}>·</Text>
                <Text style={{ color: colors.hive, fontFamily: fontFamily.body, fontSize: text.sm }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: space.s5 }}>
          <SectionHeading
            eyebrow="Admissions"
            title="Joining the hive is simple"
            subtitle="Three friendly steps help families understand the program before making a decision."
          />
          <View style={{ gap: space.s4 }}>
            {admissionSteps.map((item, index) => {
              const isLast = index === admissionSteps.length - 1;
              return (
                <View key={item.step} style={{ flexDirection: 'row', gap: space.s4 }}>
                  <View style={{ width: 56, alignItems: 'center', gap: space.s1 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: colors.nectar,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: colors.honeyDeep,
                          fontFamily: fontFamily.heading,
                          fontSize: text.base,
                        }}
                      >
                        {item.step}
                      </Text>
                    </View>
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
                  <View
                    style={{
                      flex: 1,
                      gap: space.s1,
                      paddingBottom: isLast ? 0 : space.s4,
                    }}
                  >
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
            })}
          </View>
        </View>

        <View onLayout={(e) => { inquiryY.current = e.nativeEvent.layout.y; }}>
          <InquiryForm scrollRef={scrollRef} />
        </View>

        <View style={{ gap: space.s5 }}>
          <SectionHeading
            eyebrow="Stay updated"
            title="Notices from the hive"
            subtitle="Dates and announcements below are typed demo content for the public-site prototype and require school confirmation."
          />
          <View>
            {notices.map((item) => (
              <NoticeCard key={item.title} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
