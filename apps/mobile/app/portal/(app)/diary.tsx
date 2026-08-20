import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DiaryCard, PortalHeader, SectionHeading } from '@/components';
import { diaryEntries, linkedChild } from '@/lib/demo-data';
import { useSession } from '@/lib/session';
import { colors, space } from '@/theme/tokens';

export default function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useSession();
  const router = useRouter();

  const onSignOut = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader title="Parent Portal" subtitle={linkedChild.name} onSignOut={onSignOut} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: space.s5,
          paddingTop: space.s5,
          paddingBottom: insets.bottom + space.s9,
          gap: space.s6,
        }}
      >
        <View style={{ gap: space.s4 }}>
          <SectionHeading eyebrow="Daily diary" title="What Ariaan did" />
          {diaryEntries.map((entry) => (
            <DiaryCard key={entry.date} entry={entry} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
