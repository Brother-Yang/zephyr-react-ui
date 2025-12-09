import React, { useState } from 'react';
import type { RadioProps } from '../../types/radio';
import './Radio.less';
import '../../styles/variables.less';
import { withPrefix } from '../../config/classPrefix';

export default function Radio<T extends string | number = string | number>({
  checked,
  defaultChecked,
  disabled,
  size = 'medium',
  value,
  onChange,
  label,
  readOnly,
  status,
  ariaPosinset,
  ariaSetsize,
  className = '',
  style,
  ...rest
}: RadioProps<T>) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked || false);
  const current = isControlled ? checked! : internal;

  const rootClasses = [
    withPrefix('radio'),
    withPrefix(`radio-${size}`),
    disabled ? withPrefix('radio-disabled') : '',
    readOnly ? withPrefix('radio-readonly') : '',
    status ? withPrefix(`radio-${status}`) : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
  const boxClasses = [withPrefix('radio-box'), current ? withPrefix('radio-checked') : ''].filter(Boolean).join(' ');

  const toggle = () => {
    if (disabled || readOnly) return;
    const next = true; // radio sets checked when selected
    if (!isControlled) setInternal(next);
    onChange?.(next, value);
  };

  return (
    <label
      className={rootClasses}
      style={style}
      role="radio"
      aria-checked={current}
      aria-disabled={disabled || undefined}
      aria-readonly={readOnly || undefined}
      aria-posinset={ariaPosinset}
      aria-setsize={ariaSetsize}
    >
      <span className={boxClasses}>
        <input
          type="radio"
          className={withPrefix('radio-input')}
          checked={current}
          onChange={toggle}
          disabled={disabled}
          value={value !== undefined ? String(value) : undefined}
          aria-posinset={ariaPosinset}
          aria-setsize={ariaSetsize}
          {...rest}
        />
        <span className={withPrefix('radio-dot')} />
      </span>
      {label && <span className={withPrefix('radio-label')}>{label}</span>}
    </label>
  );
}
