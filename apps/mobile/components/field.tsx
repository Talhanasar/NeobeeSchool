import { forwardRef } from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { colors, space, text } from '@/theme/tokens';

type FieldProps = Omit<TextInputProps, 'style'> & {
  readonly label: string;
  readonly error?: string;
  readonly required?: boolean;
};

export const Field = forwardRef<TextInput, FieldProps>(function Field(
  { label, error, required, accessibilityLabel, ...inputProps },
  ref,
) {
  const hasError = Boolean(error);

  return (
    <View style={{ gap: space.s2 }}>
      <Text
        style={{
          color: colors.hiveSoft,
          fontFamily: 'Nunito_800ExtraBold',
          fontSize: text.xs,
          letterSpacing: 0.7,
          textTransform: 'uppercase',
        }}
      >
        {label}
        {required ? (
          <Text style={{ color: colors.danger }}> *</Text>
        ) : null}
      </Text>
      <TextInput
        ref={ref}
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor={colors.hiveSoft}
        style={{
          width: '100%',
          minHeight: inputProps.multiline
            ? text.base * 1.6 * 4 + space.s3 * 2
            : 48,
          paddingVertical: space.s3,
          paddingHorizontal: space.s3,
          borderWidth: 2,
          borderRadius: 11,
          borderColor: hasError ? colors.danger : 'rgba(83, 61, 19, 0.16)',
          backgroundColor: colors.cream,
          color: colors.hive,
          fontFamily: 'Nunito_600SemiBold',
          fontSize: text.base,
          lineHeight: inputProps.multiline ? text.base * 1.6 : undefined,
        }}
        {...inputProps}
      />
      {error ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.danger,
            fontFamily: 'Nunito_700Bold',
            fontSize: text.xs,
            lineHeight: text.xs * 1.35,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
});
