import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { FormProps, FormItemProps, FormRule } from '../../types/form';
import styles from './Form.module.css';
import '../../styles/variables.css';

type AnyValues = Record<string, any>;

interface FieldMeta {
  name: string;
  rules: FormRule[];
  valuePropName: 'value' | 'checked';
}

interface FormContextType {
  values: AnyValues;
  errors: Record<string, string | null>;
  setFieldValue: (name: string, value: any) => void;
  getFieldValue: (name: string) => any;
  registerField: (meta: FieldMeta) => void;
  unregisterField: (name: string) => void;
  validateField: (name: string) => string | null;
  validateOnChange: boolean;
  layout: 'vertical' | 'horizontal';
}

const FormContext = createContext<FormContextType | null>(null);

export default function Form<TValues extends AnyValues = AnyValues>({
  initialValues,
  onFinish,
  onReset,
  layout = 'vertical',
  disabled = false,
  validateOnChange = true,
  className = '',
  style,
  children,
  ...rest
}: FormProps<TValues>) {
  const [values, setValues] = useState<AnyValues>({ ...(initialValues || {}) });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const fields = useRef<Map<string, FieldMeta>>(new Map());

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const getFieldValue = useCallback((name: string) => values[name], [values]);

  const registerField = useCallback((meta: FieldMeta) => {
    fields.current.set(meta.name, meta);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fields.current.delete(name);
  }, []);

  const runRules = (name: string, value: any): string | null => {
    const meta = fields.current.get(name);
    const rules = meta?.rules || [];
    for (const rule of rules) {
      if (rule.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        return rule.message || 'This field is required';
      }
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        return rule.message || 'Invalid format';
      }
      if (typeof value === 'string') {
        if (rule.min !== undefined && value.length < rule.min) return rule.message || `Minimum ${rule.min} characters`;
        if (rule.max !== undefined && value.length > rule.max) return rule.message || `Maximum ${rule.max} characters`;
      }
      if (rule.validator) {
        const msg = rule.validator(value, values);
        if (msg) return msg;
      }
    }
    return null;
  };

  const validateField = useCallback((name: string) => {
    const err = runRules(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: err }));
    return err;
  }, [values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string | null> = {};
    for (const name of fields.current.keys()) {
      nextErrors[name] = runRules(name, values[name]);
    }
    setErrors(nextErrors);
    const hasError = Object.values(nextErrors).some(Boolean);
    if (!hasError) onFinish?.(values as TValues);
  };

  const handleReset = () => {
    setValues({ ...(initialValues || {}) });
    setErrors({});
    onReset?.();
  };

  const ctx = useMemo<FormContextType>(() => ({
    values,
    errors,
    setFieldValue,
    getFieldValue,
    registerField,
    unregisterField,
    validateField,
    validateOnChange,
    layout,
  }), [values, errors, setFieldValue, getFieldValue, registerField, unregisterField, validateField, validateOnChange, layout]);

  const classes = [styles.form, layout === 'horizontal' ? styles['form-horizontal'] : '', disabled ? styles.disabled : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <form className={classes} style={style} onSubmit={handleSubmit} onReset={handleReset} {...rest}>
      <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
    </form>
  );
}

export function FormItem<TValues extends AnyValues = AnyValues>({
  name,
  label,
  required,
  rules = [],
  valuePropName = 'value',
  help,
  className = '',
  style,
  children,
}: FormItemProps<TValues>) {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('FormItem must be used within Form');

  const mergedRules = required ? [{ required: true } as FormRule].concat(rules) : rules;

  React.useEffect(() => {
    ctx.registerField({ name, rules: mergedRules, valuePropName });
    return () => ctx.unregisterField(name);
  }, [name, JSON.stringify(mergedRules), valuePropName]);

  const value = ctx.getFieldValue(name);
  const error = ctx.errors[name] || null;

  const childProps: Record<string, any> = {
    [valuePropName]: value,
    onChange: (v: any) => {
      ctx.setFieldValue(name, v);
      if (ctx.validateOnChange) ctx.validateField(name);
    },
    disabled: undefined,
  };

  const control = React.cloneElement(children, childProps);

  const itemClasses = [styles.item, error ? styles['has-error'] : '', className].filter(Boolean).join(' ');

  return (
    <div className={itemClasses} style={style}>
      {label && (
        <div className={styles.label}>
          {label}
          {required && <span className={styles.asterisk}>*</span>}
        </div>
      )}
      <div className={styles.control}>{control}</div>
      <div className={styles.help}>{error || help || null}</div>
    </div>
  );
}
