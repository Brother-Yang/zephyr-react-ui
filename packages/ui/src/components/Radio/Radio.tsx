import React, { useState } from 'react';
import type { RadioProps } from '../../types/radio';
import styles from './Radio.module.css';
import '../../styles/variables.css';

export default function Radio<T extends string | number = string | number>({
  checked,
  defaultChecked,
  disabled,
  size = 'medium',
  value,
  onChange,
  label,
  className = '',
  style,
  ...rest
}: RadioProps<T>) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked || false);
  const current = isControlled ? checked! : internal;

  const rootClasses = [styles.radio, styles[size], disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');
  const boxClasses = [styles.box, current ? styles.checked : ''].filter(Boolean).join(' ');

  const toggle = () => {
    if (disabled) return;
    const next = true; // radio sets checked when selected
    if (!isControlled) setInternal(next);
    onChange?.(next, value);
  };

  return (
    <label className={rootClasses} style={style}>
      <span className={boxClasses}>
        <input
          type="radio"
          className={styles.input}
          checked={current}
          onChange={toggle}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.dot} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

