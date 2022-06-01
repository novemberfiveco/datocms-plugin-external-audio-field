import React, { useState } from 'react';

import { FormLabel } from 'datocms-react-ui';
import classes from 'entrypoints/styles.module.css';

import PlayerVariantSelect, { VariantOption } from './PlayerVariantSelect';

export type Options = {
  options?: VariantOption[];
  variant?: VariantOption;
  toggles?: { [index: string]: boolean };
};

interface Props {
  onOptionsChange?: (options: Options) => void;
  initialValues?: Options;
}

const PlayerOptions = ({
  initialValues = {},
  onOptionsChange = () => {},
}: Props) => {
  const [options, setOptions] = useState<Options>({
    variant: initialValues.variant,
    toggles: initialValues?.toggles,
  });

  const handleOptionChange = (name: string, option?: VariantOption | null) => {
    setOptions((prev) => {
      const newState = {
        ...prev,
        [name]: option,
        toggles: option?.defaultToggles,
      };
      onOptionsChange(newState);
      return newState;
    });
  };

  const handleToggleChange = (value: { [key: string]: boolean }) => {
    setOptions((prev) => {
      const newState = {
        ...prev,
        toggles: { ...(prev?.toggles ?? {}), ...value },
      };
      onOptionsChange(newState);
      return newState;
    });
  };

  return (
    <div>
      {!!initialValues.options?.length && (
        <div className={classes.group}>
          <PlayerVariantSelect
            value={options.variant}
            onVariantChange={(option) => handleOptionChange('variant', option)}
            options={initialValues.options}
          />
        </div>
      )}
      {Object.values(options?.toggles ?? {}).length > 0 && (
        <div className={classes.group}>
          <FormLabel htmlFor="">Options</FormLabel>
          <div className={classes.checkboxGroup}>
            {Object.keys(options?.variant?.defaultToggles ?? {}).map((key) => {
              return (
                <div key={key}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleToggleChange({ [key]: e.target.checked })
                    }
                    id={key}
                    value={key}
                    checked={!!options.toggles?.[key]}
                  />
                  <label htmlFor={key}>{key}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PlayerOptions);
