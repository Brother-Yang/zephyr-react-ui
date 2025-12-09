import React from 'react';
import './Empty.less';
import '../../styles/variables.less';
import { withPrefix } from '../../config/classPrefix';

export interface EmptyProps {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Empty({ icon, description, actions, size = 'medium', className = '', style, children }: EmptyProps) {
  const classes = [withPrefix('empty'), withPrefix(`empty-${size}`), className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={style} role="status" aria-live="polite">
      {icon && <div className={withPrefix('empty-icon')} aria-hidden>{icon}</div>}
      <div className={withPrefix('empty-text')}>{children ?? description ?? 'Empty'}</div>
      {actions && <div className={withPrefix('empty-actions')}>{actions}</div>}
    </div>
  );
}
