import {
  useFonts as useFredokaFonts,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import {
  useFonts as useNunitoFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';

export const fontFamily = {
  heading: 'Fredoka_600SemiBold',
  body: 'Nunito_400Regular',
} as const;

export function useAppFonts(): boolean {
  const [fredokaLoaded, fredokaError] = useFredokaFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const [nunitoLoaded, nunitoError] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  const loaded = fredokaLoaded && nunitoLoaded;
  const failed = fredokaError != null || nunitoError != null;

  return loaded || failed;
}
