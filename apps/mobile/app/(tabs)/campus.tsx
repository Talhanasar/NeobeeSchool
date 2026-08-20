import {
  ScrollView,
  View,
  Pressable,
  Linking,
  Text,
  Image,
  type ViewStyle,
} from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import {
  SectionHeading,
  InfoRow,
  Card,
  TeacherCard,
  Icon,
} from '@/components';
import { facilities, safety, teachers, contact } from '@/lib/content';
import { photos } from '@/lib/photos';

export default function CampusScreen() {
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
          eyebrow="Campus & care"
          title="Made for small people and big imaginations"
          subtitle="The proposed campus experience is calm, colorful, child-sized, and designed to keep care visible at every step."
        />
        <View style={{ gap: space.s3 }}>
          {([
            { key: 'campusSoftPlay' as const, label: 'Indoor soft play' },
            { key: 'campusClassroom' as const, label: 'Classrooms' },
            { key: 'campusReading' as const, label: 'Reading corner' },
            { key: 'campusGarden' as const, label: 'Garden' },
          ]).map((item) => {
            const photo = photos[item.key];
            return (
              <Card key={item.key} tone="white" elevated style={{ overflow: 'hidden' }}>
                <View style={{ position: 'relative' }}>
                  <Image
                    source={photo.source}
                    accessibilityLabel={photo.alt}
                    style={{
                      width: '100%',
                      height: 300,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      paddingVertical: space.s3,
                      paddingHorizontal: space.s4,
                      experimental_backgroundImage:
                        'linear-gradient(to top, rgba(42, 31, 12, 0.72), rgba(42, 31, 12, 0))',
                    } as ViewStyle}
                  >
                    <Text
                      style={{
                        fontFamily: 'Nunito_700Bold',
                        fontSize: text.base,
                        color: colors.white,
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
        <View style={{ gap: space.s4 }}>
          {facilities.map((item) => (
            <InfoRow
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </View>
      </View>

      <Card tone="leafSoft" style={{ padding: space.s5, gap: space.s4 }}>
        <Text
          style={{
            color: colors.hive,
            fontFamily: fontFamily.heading,
            fontSize: text.xl,
          }}
        >
          Safety promise
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: space.s3,
          }}
        >
          {safety.map((item) => (
            <View
              key={item.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: space.s2,
                minWidth: '48%',
              }}
            >
              <Icon name={item.icon} size={20} color={colors.leaf} />
              <Text
                style={{
                  flex: 1,
                  color: colors.hiveSoft,
                  fontFamily: fontFamily.body,
                  fontSize: text.sm,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={{ gap: space.s5 }}>
        <SectionHeading
          eyebrow="Meet the team"
          title="Warm guides for every little bee"
          subtitle="This section demonstrates the intended teacher-card design. All people, roles, initials, and qualifications below are sample content."
        />
        <View style={{ gap: space.s5 }}>
          {teachers.map((item) => (
            <TeacherCard key={item.name} item={item} />
          ))}
        </View>
      </View>

      <View style={{ gap: space.s5 }}>
        <SectionHeading
          eyebrow="Contact"
          title="Come say hello"
          subtitle="Book ahead so the team can welcome your family and guide you to the campus."
        />
        <Card tone="white" style={{ padding: space.s5, gap: space.s4 }}>
          <InfoRow
            icon="location"
            title="Preschool campus"
            text={contact.address}
          />
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Phone or WhatsApp ${contact.phone}`}
            onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\s/g, '')}`)}
            style={{ minHeight: 44, justifyContent: 'center' }}
          >
            <InfoRow icon="phone" title="Phone / WhatsApp" text={contact.phone} />
          </Pressable>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Email ${contact.email}`}
            onPress={() => Linking.openURL(`mailto:${contact.email}`)}
            style={{ minHeight: 44, justifyContent: 'center' }}
          >
            <InfoRow icon="mail" title="Email" text={contact.email} />
          </Pressable>
          <InfoRow icon="clock" title="Visit hours" text={contact.hours} />
        </Card>
      </View>
    </ScrollView>
  );
}
