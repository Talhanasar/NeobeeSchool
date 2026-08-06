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
  SectionHeading,
  NoticeCard,
  InquiryForm,
} from '@/components';
import { admissionSteps, notices } from '@/lib/content';

export default function AdmissionsScreen() {
  const scrollRef = useRef<ScrollView>(null);

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

        <InquiryForm scrollRef={scrollRef} />

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
