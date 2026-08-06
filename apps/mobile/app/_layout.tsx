import { useCallback, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashOverlay } from '@/components';
import { colors } from '@/theme/tokens';
import { useAppFonts } from '@/theme/typography';

export default function RootLayout() {
  const ready = useAppFonts();
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark" />
      {ready ? (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.cream },
          }}
        />
      ) : null}
      {splashDone ? null : (
        <SplashOverlay ready={ready} onFinish={handleSplashFinish} />
      )}
    </SafeAreaProvider>
  );
}
