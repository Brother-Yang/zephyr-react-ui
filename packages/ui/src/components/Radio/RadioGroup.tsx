import React, { useState } from 'react';
import type { RadioGroupProps } from '../../types/radio';
import Radio from './Radio';
import styles from './Radio.module.css';

export default function RadioGroup<T extends string | number = string | number>({
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  size = 'medium',
  direction = 'horizontal',
  className = '',
  style,
  ...rest
}: RadioGroupProps<T>) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const current = isControlled ? value! : internal;

  const classes = [styles.group, direction === 'vertical' ? styles.vertical : '', className].filter(Boolean).join(' ');

  const handleChange = (checked: boolean, v?: T) => {
    if (!checked || v === undefined) return;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={classes} style={style} {...rest}>
      {options.map(opt => (
        <Radio
          key={String(opt.value)}
          label={opt.label}
          value={opt.value}
          checked={String(current) === String(opt.value)}
          onChange={(checked) => handleChange(checked, opt.value)}
          disabled={disabled || opt.disabled}
          size={size}
        />
      ))}
    </div>
  );
}

