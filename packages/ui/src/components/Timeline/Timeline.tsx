import React from 'react'
import './Timeline.css'
import { withPrefix } from '../../config/classPrefix'
import type { TimelineItem, TimelineProps } from '../../types/timeline'

export default function Timeline({ items, orientation = 'vertical', className = '', style }: TimelineProps) {
  const rootClasses = [withPrefix('timeline'), withPrefix(`timeline-${orientation}`), className].filter(Boolean).join(' ')
  return (
    <div className={rootClasses} style={style}>
      {items.map((it, idx) => {
        const itemClasses = [withPrefix('timeline-item'), it.status ? withPrefix(`timeline-${it.status}`) : ''].filter(Boolean).join(' ')
        return (
          <div key={it.key || String(idx)} className={itemClasses}>
            <span className={withPrefix('timeline-dot')} aria-hidden />
            {orientation === 'vertical' && (idx !== items.length - 1) && (
              <span className={withPrefix('timeline-line')} aria-hidden />
            )}
            {orientation === 'horizontal' && idx > 0 && (
              <span className={withPrefix('timeline-line-left')} aria-hidden />
            )}
            {orientation === 'horizontal' && idx < items.length - 1 && (
              <span className={withPrefix('timeline-line-right')} aria-hidden />
            )}
            {it.label && <div className={withPrefix('timeline-label')}>{it.label}</div>}
            <div className={withPrefix('timeline-content')}>{it.content}</div>
          </div>
        )
      })}
    </div>
  )
}
