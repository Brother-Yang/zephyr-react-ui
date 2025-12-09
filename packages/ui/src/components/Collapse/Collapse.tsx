import React, { useState } from 'react'
import './Collapse.less'
import { withPrefix } from '../../config/classPrefix'
import type { CollapseProps } from '../../types/collapse'

export default function Collapse({ items, defaultActiveKeys = [], accordion = false, className = '', style, onChange, iconRender, iconPosition = 'left' }: CollapseProps) {
  const [active, setActive] = useState<string[]>(accordion ? (defaultActiveKeys[0] ? [defaultActiveKeys[0]] : []) : defaultActiveKeys)
  const rootClasses = [withPrefix('collapse'), className].filter(Boolean).join(' ')

  function toggle(key: string, disabled?: boolean) {
    if (disabled) return
    setActive(prev => {
      let next: string[]
      if (accordion) next = prev.includes(key) ? [] : [key]
      else next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      onChange?.(next)
      return next
    })
  }

  return (
    <div className={rootClasses} style={style}>
      {items.map(it => {
        const opened = active.includes(it.key)
        const itemClasses = [withPrefix('collapse-item'), opened ? withPrefix('collapse-item-active') : '', it.disabled ? withPrefix('collapse-item-disabled') : ''].filter(Boolean).join(' ')
        return (
          <div key={it.key} className={itemClasses}>
            <button type="button" className={withPrefix('collapse-header')} onClick={() => toggle(it.key, it.disabled)} aria-expanded={opened} aria-disabled={it.disabled || undefined}>
              {iconPosition === 'left' && (
                <span className={withPrefix('collapse-icon')}>{iconRender ? iconRender(opened) : (opened ? '▾' : '▸')}</span>
              )}
              <span className={withPrefix('collapse-label')}>{it.label}</span>
              {iconPosition === 'right' && (
                <span className={withPrefix('collapse-icon')}>{iconRender ? iconRender(opened) : (opened ? '▾' : '▸')}</span>
              )}
            </button>
            {opened && (
              <div className={withPrefix('collapse-content')} role="region">
                {it.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
