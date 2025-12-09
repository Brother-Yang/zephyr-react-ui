import React, { useState } from 'react';
import type { RadioGroupProps } from '../../types/radio';
import Radio from './Radio';
import './Radio.less';
import { withPrefix } from '../../config/classPrefix';

export default function RadioGroup<T extends string | number = string | number>({
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  size = 'medium',
  direction = 'horizontal',
  name,
  label,
  className = '',
  style,
  ...rest
}: RadioGroupProps<T>) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const current = isControlled ? value! : internal;

  const classes = [withPrefix('radio-group'), direction === 'vertical' ? withPrefix('radio-vertical') : '', className].filter(Boolean).join(' ');
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const labelId = React.useRef(`radiogroup-${Math.random().toString(36).slice(2)}`)

  const handleChange = (checked: boolean, v?: T) => {
    if (!checked || v === undefined) return;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const setNext = (dir: 1 | -1) => {
    const len = options.length
    if (len === 0) return
    const curIdx = options.findIndex(o => String(current) === String(o.value))
    let ni = curIdx
    if (ni < 0) ni = dir > 0 ? 0 : len - 1
    else ni = (ni + dir + len) % len
    // skip disabled
    let tries = 0
    while (options[ni]?.disabled && tries < len) {
      ni = (ni + dir + len) % len
      tries++
    }
    const nextVal = options[ni]?.value
    if (nextVal !== undefined) {
      if (!isControlled) setInternal(nextVal)
      onChange?.(nextVal)
      const inputs = containerRef.current?.querySelectorAll<HTMLInputElement>('input[type="radio"]')
      const el = inputs?.[ni]
      el?.focus()
    }
  }

  return (
    <div
      className={classes}
      style={style}
      role="radiogroup"
      aria-labelledby={label ? labelId.current : undefined}
      tabIndex={0}
      ref={containerRef}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setNext(1) }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setNext(-1) }
      }}
      {...rest}
    >
      {label && (
        <div id={labelId.current} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>{label}</div>
      )}
      {options.map((opt, idx) => (
        <Radio
          key={String(opt.value)}
          label={opt.label}
          value={opt.value}
          checked={String(current) === String(opt.value)}
          onChange={(checked) => handleChange(checked, opt.value)}
          disabled={disabled || opt.disabled}
          size={size}
          name={name}
          readOnly={readOnly}
          ariaPosinset={idx + 1}
          ariaSetsize={options.length}
          tabIndex={(function(){
            const sel = options.findIndex(o => String(current) === String(o.value))
            const focusIdx = sel >= 0 ? sel : (options.findIndex(o => !o.disabled) >= 0 ? options.findIndex(o => !o.disabled) : 0)
            return idx === focusIdx ? 0 : -1
          })()}
        />
      ))}
    </div>
  );
}
