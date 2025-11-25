import React from 'react';

export type FormLayout = 'vertical' | 'horizontal';

export interface FormRule<T = any> {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (value: T, values: Record<string, any>) => string | null;
}

export interface FormProps<TValues extends Record<string, any> = Record<string, any>> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  initialValues?: Partial<TValues>;
  onFinish?: (values: TValues) => void;
  onReset?: () => void;
  layout?: FormLayout;
  disabled?: boolean;
  validateOnChange?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormItemProps<TValues extends Record<string, any> = Record<string, any>> {
  name: keyof TValues & string;
  label?: React.ReactNode;
  required?: boolean;
  rules?: FormRule[];
  valuePropName?: 'value' | 'checked';
  help?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactElement;
}

