import { Tabs } from 'expo-router';
import { Icon, AppHeader } from '@/components';
import { colors, space, text } from '@/theme/tokens';

const tabs = [
  { name: 'index', title: 'Home', icon: 'home' as const },
  { name: 'classes', title: 'Classes', icon: 'classes' as const },
  { name: 'campus', title: 'Campus', icon: 'campus' as const },
  { name: 'admissions', title: 'Admissions', icon: 'admissions' as const },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <AppHeader />,
        tabBarActiveTintColor: colors.honeyDeep,
        tabBarInactiveTintColor: colors.hiveSoft,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: space.s1,
          height: 64,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_600SemiBold',
          fontSize: text.xs,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Icon name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
