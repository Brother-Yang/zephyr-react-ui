import React, { useState, forwardRef } from 'react';
import type { InputProps } from '../../types/input';
import './Input.less';
import '../../styles/variables.less';
import { useConfig } from '../../config';
import { withPrefix } from '../../config/classPrefix';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
{
  value,
  defaultValue,
  onChange,
  onClear,
  onPressEnter,
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
}: InputProps, ref) {
  const { locale } = useConfig();
  const [internal, setInternal] = useState<string>(defaultValue || '');
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value! : internal;

  const wrapperClasses = [
    withPrefix('input-wrapper'),
    withPrefix(`input-${size}`),
    status !== 'default' ? withPrefix(`status-${status}`) : '',
    disabled ? withPrefix('disabled') : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onPressEnter?.(inputValue);
    if (e.key === 'Escape' && allowClear && inputValue && !disabled) {
      if (!isControlled) setInternal('');
      onChange?.('');
      onClear?.();
    }
  };

  return (
    <div className={wrapperClasses} style={style}>
      {prefix && <span className={withPrefix('prefix')}>{prefix}</span>}
      <input
        className={withPrefix('input-control')}
        ref={ref}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={status === 'error' || undefined}
        {...rest}
      />
      {allowClear && inputValue && !disabled && (
        <button
          type="button"
          className={withPrefix('clear')}
          onClick={() => { if (!isControlled) setInternal(''); onChange?.(''); onClear?.(); }}
          aria-label={locale?.input?.clear ?? 'Clear'}
        >
          ×
        </button>
      )}
      {suffix && <span className={withPrefix('suffix')}>{suffix}</span>}
    </div>
  );
});

export default Input;
