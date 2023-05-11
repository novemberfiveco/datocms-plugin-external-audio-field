import _omit from 'lodash/omit';

import { PROVIDER_CONFIG } from 'constants/providers';
import { FieldFormValues } from 'types/plugin.types';

import type { Options } from 'components/PlayerOptions';

type ProviderKey = keyof typeof PROVIDER_CONFIG;

export const getProviderDefaultOptions = (
  formValues: FieldFormValues | null,
  config?: (typeof PROVIDER_CONFIG)[ProviderKey],
): Options => {
  const variantOptions =
    config && 'options' in config ? config.options.variant : undefined;

  const defaultVariant = variantOptions
    ? {
        label: variantOptions.default.label ?? '',
        value: _omit(variantOptions.default, 'toggles'),
        defaultToggles: variantOptions.default?.toggles,
      }
    : undefined;

  return {
    options: Object.values(variantOptions ?? {}).map((value) => ({
      label: value.label,
      value: _omit(value, 'toggles'),
      defaultToggles: value.toggles,
    })),
    variant: formValues?.options?.variant ?? defaultVariant,
    toggles:
      formValues?.options?.toggles ?? defaultVariant?.defaultToggles ?? {},
  };
};
