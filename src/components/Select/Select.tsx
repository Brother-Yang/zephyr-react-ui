import React from 'react';
import type { SelectProps } from '../../types/select';
import styles from './Select.module.css';
import '../../styles/variables.css';

export default function Select<T extends string | number = string | number>({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  multiple = false,
  size = 'medium',
  className = '',
  style,
  ...rest
}: SelectProps<T>) {
  const classes = [styles.select, styles[`select-${size}`], disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selected = Array.from(e.target.selectedOptions).map(o => (o.value as unknown as T));
      onChange?.(selected);
    } else {
      onChange?.(e.target.value as unknown as T);
    }
  };

  return (
    <div className={classes} style={style}>
      <select
        className={styles.native}
        disabled={disabled}
        multiple={multiple}
        value={value as any}
        onChange={handleChange}
        {...rest}
      >
        {placeholder && !multiple && (
          <option value="" disabled selected={!value}>{placeholder}</option>
        )}
        {options.map(opt => (
          <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

