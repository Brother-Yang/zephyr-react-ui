import React from 'react';

export type ThemeMode = 'light' | 'dark';
export type ComponentSize = 'small' | 'medium' | 'large';

export interface Locale {
  table: {
    noData: string;
    pagination: {
      prev: string;
      next: string;
      items: string;
    };
  };
  select: {
    placeholder: string;
    placeholderMultiple: string;
  };
}

export type ThemeTokens = Partial<Record<string, string>>;

export interface ConfigProviderProps {
  children: React.ReactNode;
  locale?: Locale;
  theme?: ThemeMode;
  tokens?: ThemeTokens;
  size?: ComponentSize;
  className?: string;
  style?: React.CSSProperties;
}

