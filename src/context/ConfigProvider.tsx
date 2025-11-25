import React, { createContext, useMemo } from 'react';
import type { ConfigProviderProps, Locale, ThemeMode, ThemeTokens, ComponentSize } from '../types/config';

export const enUS: Locale = {
  table: {
    noData: 'No data available',
    pagination: { prev: 'Previous', next: 'Next', items: 'items' }
  },
  select: { placeholder: 'Select', placeholderMultiple: 'Select options' }
};

export const zhCN: Locale = {
  table: {
    noData: '暂无数据',
    pagination: { prev: '上一页', next: '下一页', items: '条' }
  },
  select: { placeholder: '请选择', placeholderMultiple: '请选择选项' }
};

export interface ConfigContextValue {
  locale: Locale;
  theme: ThemeMode;
  tokens: ThemeTokens;
  size: ComponentSize;
}

const ConfigContext = createContext<ConfigContextValue>({ locale: enUS, theme: 'light', tokens: {}, size: 'medium' });

export default function ConfigProvider({ children, locale = enUS, theme = 'light', tokens = {}, size = 'medium', className = '', style }: ConfigProviderProps) {
  const ctx = useMemo<ConfigContextValue>(() => ({ locale, theme, tokens, size }), [locale, theme, tokens, size]);

  const varStyle: React.CSSProperties = Object.keys(tokens).reduce((acc, key) => {
    const k = key.startsWith('--') ? key : `--${key}`;
    return { ...acc, [k]: tokens[key as keyof ThemeTokens] as string };
  }, {} as React.CSSProperties);

  return (
    <div data-theme={theme} className={className} style={{ ...varStyle, ...style }}>
      <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
    </div>
  );
}

export { ConfigContext };

