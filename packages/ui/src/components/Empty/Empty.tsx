import React from 'react';
import styles from './Empty.module.css';
import '../../styles/variables.css';

export default function Empty({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const classes = [styles.empty, className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={style}>
      {children ?? 'Empty'}
    </div>
  );
}
