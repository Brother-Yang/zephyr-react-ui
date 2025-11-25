import React, { useEffect, useRef, useState } from 'react';
import type { CheckboxProps } from '../../types/checkbox';
import styles from './Checkbox.module.css';
import '../../styles/variables.css';

export default function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled,
  label,
  onChange,
  className = '',
  style,
  ...rest
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked || false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate && !(isControlled ? checked! : internalChecked);
  }, [indeterminate, checked, internalChecked, isControlled]);

  const currentChecked = isControlled ? checked! : internalChecked;

  const rootClasses = [styles.checkbox, disabled ? styles.disabled : '', className].filter(Boolean).join(' ');
  const boxClasses = [styles.box, currentChecked ? styles.checked : '', indeterminate ? styles.indeterminate : '']
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={rootClasses} style={style}>
      <span className={boxClasses}>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.input}
          checked={currentChecked}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        {(currentChecked || indeterminate) && <span className={styles.tick}>{indeterminate ? '−' : '✓'}</span>}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

