import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark, Button, Field, PortalHeader } from '@/components';
import { checkCredentials, demoCredentials } from '@/lib/demo-data';
import { useSession, type Role } from '@/lib/session';
import { colors, shadows, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';

function normaliseRole(raw: string | undefined): Role {
  return raw === 'teacher' ? 'teacher' : 'parent';
}

const subtitleByRole: Record<Role, string> = {
  parent:
    "Sign in to follow your child's day — attendance, diary notes, and invoices in one place.",
  teacher:
    'Sign in to your class roster, mark attendance, and share daily diaries with families.',
};

export default function PortalLoginScreen() {
  const params = useLocalSearchParams<{ role?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useSession();

  const [role, setRole] = useState<Role>(normaliseRole(params.role));
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const switchRole = (next: Role) => {
    if (next === role) return;
    setRole(next);
    setPhone('');
    setPassword('');
    setError(null);
  };

  const onSubmit = () => {
    if (phone.trim() === '' || password === '') {
      setError('Enter your phone number and password.');
      return;
    }
    setError(null);
    setSubmitting(true);
    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      const ok = checkCredentials(role, phone, password);
      if (ok) {
        signIn(role);
        router.replace('/portal');
      } else {
        setError("That phone number and password don't match our demo account.");
        setSubmitting(false);
      }
    }, 400);
  };

  const onTryDemo = () => {
    const creds = demoCredentials[role];
    setPhone(creds.phone);
    setPassword(creds.password);
    setError(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <PortalHeader title="Portal sign-in" subtitle="Demo preview" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: space.s5,
            paddingTop: space.s6,
            paddingBottom: insets.bottom + space.s7,
            gap: space.s5,
            alignItems: 'stretch',
          }}
        >
          <View style={{ alignItems: 'center', gap: space.s3 }}>
            <BrandMark size={72} />
            <Text
              style={{
                fontFamily: fontFamily.heading,
                fontSize: text.xxl,
                color: colors.hive,
                textAlign: 'center',
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.body,
                fontSize: text.sm,
                color: colors.hiveSoft,
                textAlign: 'center',
                lineHeight: text.sm * 1.6,
              }}
            >
              {subtitleByRole[role]}
            </Text>
          </View>

          <View
            accessibilityRole="tablist"
            style={{
              flexDirection: 'row',
              backgroundColor: colors.cream,
              borderRadius: 999,
              padding: 4,
              gap: 4,
            }}
          >
            {(['teacher', 'parent'] as const).map((r) => {
              const active = r === role;
              return (
                <Pressable
                  key={r}
                  accessibilityRole="tab"
                  accessibilityLabel={`Sign in as ${r === 'teacher' ? 'Teacher' : 'Parent'}`}
                  accessibilityState={{ selected: active, disabled: submitting }}
                  disabled={submitting}
                  onPress={() => switchRole(r)}
                  style={{
                    flex: 1,
                    minHeight: 44,
                    borderRadius: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: space.s2,
                    backgroundColor: active ? colors.white : 'transparent',
                    borderWidth: active ? 1 : 0,
                    borderColor: colors.border,
                    boxShadow: active ? shadows.shadow : undefined,
                    opacity: submitting ? 0.55 : 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Nunito_800ExtraBold',
                      fontSize: text.sm,
                      color: active ? colors.hive : colors.hiveSoft,
                    }}
                  >
                    {r === 'teacher' ? 'Teacher' : 'Parent'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {error !== null ? (
            <Text
              accessibilityLiveRegion="polite"
              style={{
                color: colors.danger,
                fontFamily: 'Nunito_700Bold',
                fontSize: text.xs,
                lineHeight: text.xs * 1.4,
              }}
            >
              {error}
            </Text>
          ) : null}

          <Field
            label="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            placeholder={demoCredentials[role].phone}
            autoCapitalize="none"
          />

          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="current-password"
            placeholder="Your password"
          />

          <Button label="Sign in" onPress={onSubmit} loading={submitting} />
          <Button label="Try demo" onPress={onTryDemo} variant="secondary" />

          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: text.xs,
              color: colors.hiveSoft,
              textAlign: 'center',
              marginTop: space.s2,
            }}
          >
            This is a demo preview with sample data.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
