import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

