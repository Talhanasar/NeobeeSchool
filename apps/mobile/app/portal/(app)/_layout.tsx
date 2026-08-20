import { Redirect, Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components';
import { useSession } from '@/lib/session';
import { colors, space, text } from '@/theme/tokens';

type TabConfig = {
  readonly name: string;
  readonly title: string;
  readonly icon: 'portal' | 'diary' | 'invoice' | 'chat' | 'classes' | 'check';
};

const parentTabs: readonly TabConfig[] = [
  { name: 'index', title: 'Overview', icon: 'portal' },
  { name: 'diary', title: 'Diary', icon: 'diary' },
  { name: 'fees', title: 'Fees', icon: 'invoice' },
  { name: 'notices', title: 'Notices', icon: 'chat' },
];

const teacherTabs: readonly TabConfig[] = [
  { name: 'index', title: 'Overview', icon: 'portal' },
  { name: 'class', title: 'My Class', icon: 'classes' },
  { name: 'attendance', title: 'Attendance', icon: 'check' },
  { name: 'notices', title: 'Notices', icon: 'chat' },
];

const allTabs: readonly TabConfig[] = [
  { name: 'index', title: 'Overview', icon: 'portal' },
  { name: 'diary', title: 'Diary', icon: 'diary' },
  { name: 'fees', title: 'Fees', icon: 'invoice' },
  { name: 'notices', title: 'Notices', icon: 'chat' },
  { name: 'class', title: 'My Class', icon: 'classes' },
  { name: 'attendance', title: 'Attendance', icon: 'check' },
];

export default function PortalAppLayout() {
  const insets = useSafeAreaInsets();
  const { role } = useSession();

  if (role === null) {
    return <Redirect href="/portal/login" />;
  }

  const visibleNames = new Set((role === 'parent' ? parentTabs : teacherTabs).map((t) => t.name));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.honeyLight,
        tabBarInactiveTintColor: 'rgba(255, 232, 172, 0.55)',
        tabBarStyle: {
          backgroundColor: colors.hive,
          borderTopColor: colors.hive2,
          borderTopWidth: 1,
          paddingTop: space.s1,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_600SemiBold',
          fontSize: text.xs,
          color: colors.white,
        },
      }}
    >
      {allTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            href: visibleNames.has(tab.name) ? undefined : null,
            tabBarIcon: ({ color, size }) => (
              <Icon name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
