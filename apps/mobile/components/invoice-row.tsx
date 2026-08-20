import { Text, View } from 'react-native';
import { colors, space, text } from '@/theme/tokens';
import { fontFamily } from '@/theme/typography';
import type { Invoice, InvoiceStatus } from '@/lib/demo-data';

const statusConfig: Record<InvoiceStatus, { bg: string; fg: string; label: string }> = {
  paid: { bg: colors.leafSoft, fg: colors.success, label: 'Paid' },
  due: { bg: colors.nectarSoft, fg: colors.honeyDeep, label: 'Due' },
  overdue: { bg: colors.rose, fg: colors.danger, label: 'Overdue' },
};

type InvoiceRowProps = {
  readonly invoice: Invoice;
};

export function InvoiceRow({ invoice }: InvoiceRowProps) {
  const config = statusConfig[invoice.status];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: space.s3,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        gap: space.s3,
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontFamily: 'Nunito_700Bold',
            fontSize: text.sm,
            color: colors.hive,
          }}
          numberOfLines={1}
        >
          {invoice.item}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.body,
            fontSize: text.xs,
            color: colors.hiveSoft,
          }}
        >
          {invoice.month}
          {invoice.paidOn ? ` \u00B7 Paid ${invoice.paidOn}` : ` \u00B7 Due ${invoice.dueDate}`}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text
          style={{
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: text.base,
            color: colors.hive,
          }}
        >
          {'\u09F3'} {invoice.amountBdt.toLocaleString()}
        </Text>
        <View
          style={{
            backgroundColor: config.bg,
            borderRadius: 999,
            paddingHorizontal: space.s2,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              fontFamily: 'Nunito_800ExtraBold',
              fontSize: 10,
              color: config.fg,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {config.label}
          </Text>
        </View>
      </View>
    </View>
  );
}
