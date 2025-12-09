import React, { useState } from 'react';
import type { SwitchProps } from '../../types/switch';
import './Switch.less';
import '../../styles/variables.less';
import { withPrefix } from '../../config/classPrefix';

export default function Switch({
  checked,
  defaultChecked,
  disabled,
  size = 'medium',
  onChange,
  label,
  readOnly,
  status,
  name,
  value,
  onContent,
  offContent,
  className = '',
  style,
  ...rest
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState<boolean>(defaultChecked || false);
  const current = isControlled ? checked! : internal;

  const rootClasses = [
    withPrefix('switch'),
    withPrefix(`switch-${size}`),
    disabled ? withPrefix('disabled') : '',
    readOnly ? withPrefix('readonly') : '',
    status ? withPrefix(status) : '',
    className
  ]
    .filter(Boolean)
    .join(' ');
  const buttonClasses = [withPrefix('switch-button'), current ? withPrefix('switch-checked') : ''].filter(Boolean).join(' ');
  const { onContent: _oc, offContent: _of, status: _st, readOnly: _ro, name: _nm, value: _val, label: _lb, ...btnProps } = rest as any;

  const toggle = () => {
    if (disabled || readOnly) return;
    const next = !current;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label className={rootClasses} style={style}>
      {name && (
        <input type="checkbox" name={name} value={value ?? 'on'} checked={current} readOnly style={{ display: 'none' }} />
      )}
      <button
        type="button"
        role="switch"
        aria-checked={current}
        aria-disabled={!!disabled}
        aria-readonly={readOnly || undefined}
        className={buttonClasses}
        onClick={toggle}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        }}
        disabled={disabled}
        {...btnProps}
      >
        <span className={withPrefix('switch-thumb')} />
      </button>
      {label && <span className={withPrefix('switch-label')}>{label}</span>}
    </label>
  );
}
