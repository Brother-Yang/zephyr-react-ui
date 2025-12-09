import React from 'react'
import './Tooltip.less'
import { withPrefix } from '../../config/classPrefix'
import type { TooltipProps } from '../../types/tooltip'

export default function Tooltip({ title, placement = 'top', className = '', style, children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const rootClasses = [withPrefix('tooltip'), className].filter(Boolean).join(' ')

  function show() { setOpen(true) }
  function hide() { setOpen(false) }

  return (
    <div className={rootClasses} style={style} ref={rootRef}>
      <span className={withPrefix('tooltip-trigger')} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} tabIndex={0}>
        {children}
      </span>
      {open && (
        <div className={`${withPrefix('tooltip-content')} ${withPrefix(`tooltip-${placement}`)}`} role="tooltip">
          {title}
        </div>
      )}
    </div>
  )
}
