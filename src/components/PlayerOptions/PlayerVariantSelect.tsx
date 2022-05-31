import React from 'react';

import { FormLabel, SelectInput } from 'datocms-react-ui';

export type VariantOption = {
  label: string;
  value: { [index: string]: string | number | boolean };
  toggles: { [index: string]: boolean };
};

interface Props {
  onVariantChange?: (optionValue?: VariantOption | null) => void;
  options: VariantOption[];
  value?: VariantOption;
}

const PlayerVariantSelect = ({
  onVariantChange = () => {},
  options,
  value,
}: Props) => {
  return (
    <>
      <FormLabel htmlFor="variant">Player variant</FormLabel>
      <SelectInput
        id="variant"
        onChange={(option) => {
          onVariantChange(option);
        }}
        value={value}
        options={options}
      />
    </>
  );
};

export default PlayerVariantSelect;
