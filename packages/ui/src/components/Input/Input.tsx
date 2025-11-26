import React, { useState } from 'react';
import type { InputProps } from '../../types/input';
import styles from './Input.module.css';
import '../../styles/variables.css';

export default function Input({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  size = 'medium',
  allowClear = false,
  prefix,
  suffix,
  status = 'default',
  className = '',
  style,
  ...rest
}: InputProps) {
  const [internal, setInternal] = useState<string>(defaultValue || '');
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value! : internal;

  const wrapperClasses = [
    styles['input-wrapper'],
    styles[`input-${size}`],
    status !== 'default' ? styles[`status-${status}`] : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={wrapperClasses} style={style}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
      {allowClear && inputValue && !disabled && (
        <button className={styles.clear} onClick={() => { if (!isControlled) setInternal(''); onChange?.(''); }} aria-label="Clear">
          ×
        </button>
      )}
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </div>
  );
}

