import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  View,
  Text,
  Pressable,
  TextInput,
  type ScrollView,
  type LayoutChangeEvent,
} from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import { classes } from '@/lib/content';
import { Field } from './field';
import { Button } from './button';
import { Card } from './card';
import { Icon } from './icon';

type FormStatus = 'idle' | 'submitting' | 'success';

type FormErrors = Partial<
  Record<'parentName' | 'phone' | 'childName' | 'classLevel', string>
>;

type InquiryFormProps = {
  readonly scrollRef?: React.RefObject<ScrollView | null>;
};

const fieldOrder = ['parentName', 'phone', 'childName', 'classLevel'] as const;

type FieldKey = (typeof fieldOrder)[number];

const classOptions = classes.map((item) => ({
  value: `${item.name} · ${item.age.replace('Ages', 'ages')}`,
  label: `${item.name} · ${item.age.replace('Ages', 'ages')}`,
}));

const successMessage =
  'Thank you — your demo inquiry was validated locally. No information was sent or saved.';

export function InquiryForm({ scrollRef }: InquiryFormProps) {
  const [values, setValues] = useState({
    parentName: '',
    phone: '',
    childName: '',
    classLevel: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const parentNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const childNameRef = useRef<TextInput>(null);
  const fieldLayouts = useRef<Record<string, number>>({});
  const submitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current != null) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (values.parentName.trim().length < 2) {
      next.parentName = 'Please enter the parent or guardian’s name.';
    }
    if (!/^[+\d][\d\s-]{7,}$/.test(values.phone.trim())) {
      next.phone = 'Enter a valid phone number with at least 8 digits.';
    }
    if (values.childName.trim().length < 2) {
      next.childName = 'Please enter your child’s name.';
    }
    if (!values.classLevel) {
      next.classLevel = 'Please choose a class level.';
    }
    return next;
  }

  function scrollToField(key: FieldKey) {
    const y = fieldLayouts.current[key];
    if (y != null && scrollRef?.current) {
      scrollRef.current.scrollTo({ y: Math.max(0, y - 80), animated: true });
    }
  }

  function focusField(key: FieldKey) {
    scrollToField(key);
    if (key === 'parentName') parentNameRef.current?.focus();
    if (key === 'phone') phoneRef.current?.focus();
    if (key === 'childName') childNameRef.current?.focus();
  }

  function handleSubmit() {
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);

    const errorKeys = fieldOrder.filter((key) => nextErrors[key]);
    if (errorKeys.length > 0) {
      if (process.env.EXPO_OS === 'ios') {
        const announcement = errorKeys
          .map((key) => nextErrors[key])
          .filter(Boolean)
          .join(' ');
        AccessibilityInfo.announceForAccessibility(announcement);
      }

      const firstKey = errorKeys[0];
      focusField(firstKey);
      return;
    }

    setStatus('submitting');
    setErrors({});

    submitTimeoutRef.current = setTimeout(() => {
      setStatus('success');
    }, 1200);
  }

  function handleReset() {
    setValues({
      parentName: '',
      phone: '',
      childName: '',
      classLevel: '',
      message: '',
    });
    setErrors({});
    setStatus('idle');
  }

  function handleLayout(key: FieldKey) {
    return (event: LayoutChangeEvent) => {
      fieldLayouts.current[key] = event.nativeEvent.layout.y;
    };
  }

  if (isSuccess) {
    return (
      <Card tone="leafSoft" style={{ padding: space.s6, gap: space.s4 }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.leaf,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="check" size={28} color={colors.white} />
        </View>
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.base,
            lineHeight: text.base * 1.65,
          }}
        >
          {successMessage}
        </Text>
        <Button label="Submit another" variant="secondary" onPress={handleReset} />
      </Card>
    );
  }

  return (
    <Card tone="white" style={{ padding: space.s6, gap: space.s5 }}>
      <View style={{ gap: space.s2 }}>
        <Text
          style={{
            color: colors.honeyDeep,
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: text.xs,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Admission inquiry
        </Text>
        <Text
          style={{
            color: colors.hive,
            fontFamily: fontFamily.heading,
            fontSize: text.xxl,
            lineHeight: text.xxl * 1.14,
          }}
        >
          Tell us about your little learner
        </Text>
        <Text
          style={{
            color: colors.hiveSoft,
            fontFamily: fontFamily.body,
            fontSize: text.base,
            lineHeight: text.base * 1.65,
          }}
        >
          Demo form only — nothing is sent or stored.
        </Text>
      </View>

      <View style={{ gap: space.s5 }}>
        <View
          style={{
            backgroundColor: colors.sky,
            borderRadius: 16,
            padding: space.s4,
            gap: space.s4,
          }}
        >
          <View onLayout={handleLayout('parentName')}>
            <Field
              ref={parentNameRef}
              label="Parent or guardian’s name"
              value={values.parentName}
              onChangeText={(parentName) => {
                setValues((v) => ({ ...v, parentName }));
                if (errors.parentName) {
                  setErrors((e) => ({ ...e, parentName: undefined }));
                }
              }}
              error={errors.parentName}
              required
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              editable={!isSubmitting}
            />
          </View>

          <View onLayout={handleLayout('phone')}>
            <Field
              ref={phoneRef}
              label="Phone or WhatsApp"
              value={values.phone}
              onChangeText={(phone) => {
                setValues((v) => ({ ...v, phone }));
                if (errors.phone) {
                  setErrors((e) => ({ ...e, phone: undefined }));
                }
              }}
              placeholder="+880 1X XXXX XXXX"
              error={errors.phone}
              required
              keyboardType="phone-pad"
              autoComplete="tel"
              returnKeyType="next"
              editable={!isSubmitting}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.sky,
            borderRadius: 16,
            padding: space.s4,
            gap: space.s4,
          }}
        >
          <View onLayout={handleLayout('childName')}>
            <Field
              ref={childNameRef}
              label="Child’s name"
              value={values.childName}
              onChangeText={(childName) => {
                setValues((v) => ({ ...v, childName }));
                if (errors.childName) {
                  setErrors((e) => ({ ...e, childName: undefined }));
                }
              }}
              error={errors.childName}
              required
              autoCapitalize="words"
              autoComplete="off"
              returnKeyType="next"
              editable={!isSubmitting}
            />
          </View>

          <View onLayout={handleLayout('classLevel')} style={{ gap: space.s2 }}>
            <Text
              style={{
                color: colors.hiveSoft,
                fontFamily: 'Nunito_800ExtraBold',
                fontSize: text.xs,
                letterSpacing: 0.7,
                textTransform: 'uppercase',
              }}
            >
              Class by age
              <Text style={{ color: colors.danger }}> *</Text>
            </Text>
            <View accessibilityRole="radiogroup" style={{ gap: space.s3 }}>
              {classOptions.map((option) => {
                const selected = values.classLevel === option.value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    accessibilityLabel={option.label}
                    disabled={isSubmitting}
                    onPress={() => {
                      setValues((v) => ({ ...v, classLevel: option.value }));
                      if (errors.classLevel) {
                        setErrors((e) => ({ ...e, classLevel: undefined }));
                      }
                    }}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: space.s3,
                      paddingVertical: space.s3,
                      paddingHorizontal: space.s3,
                      minHeight: 48,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: selected
                        ? colors.honey
                        : 'rgba(83, 61, 19, 0.16)',
                      backgroundColor: selected ? colors.nectarSoft : colors.cream,
                      opacity: isSubmitting ? 0.55 : pressed ? 0.85 : 1,
                    })}
                  >
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        borderWidth: 2,
                        borderColor: selected ? colors.honey : colors.hiveSoft,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selected ? (
                        <View
                          style={{
                            width: 11,
                            height: 11,
                            borderRadius: 6,
                            backgroundColor: colors.honey,
                          }}
                        />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        color: colors.hive,
                        fontFamily: 'Nunito_600SemiBold',
                        fontSize: text.base,
                      }}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {errors.classLevel ? (
              <Text
                accessibilityLiveRegion="polite"
                style={{
                  color: colors.danger,
                  fontFamily: 'Nunito_700Bold',
                  fontSize: text.xs,
                  lineHeight: text.xs * 1.35,
                }}
              >
                {errors.classLevel}
              </Text>
            ) : null}
          </View>
        </View>

        <Field
          label="Questions (optional)"
          value={values.message}
          onChangeText={(message) => setValues((v) => ({ ...v, message }))}
          placeholder="Ask about visits, classes, fees, or settling in."
          multiline
          autoCapitalize="sentences"
          returnKeyType="done"
          editable={!isSubmitting}
        />
      </View>

      <View style={{ marginTop: space.s1 }}>
        <Button
          label="Send inquiry"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </Card>
  );
}
