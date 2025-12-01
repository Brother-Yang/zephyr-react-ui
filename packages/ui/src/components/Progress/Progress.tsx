import React from 'react'
import './Progress.css'
import { withPrefix } from '../../config/classPrefix'
import '../../styles/variables.css'
import type { ProgressProps } from '../../types/progress'

function clamp(n: number) { return Math.max(0, Math.min(100, n)) }

function Line({ percent, showInfo, format, status, strokeColor, railColor, strokeLinecap = 'round', steps, size = 'default', success }: ProgressProps) {
  const p = clamp(percent || 0)
  const sp = clamp(success?.percent || 0)
  const height = size === 'small' ? 6 : size === 'large' ? 12 : 8
  const bodyStyle: React.CSSProperties = { height }
  const railStyle: React.CSSProperties = { background: railColor }
  const successStyle: React.CSSProperties = { width: `${sp}%`, background: success?.strokeColor || 'var(--color-success)', borderTopRightRadius: 0, borderBottomRightRadius: 0 }
  const trackStyle: React.CSSProperties = { width: `${Math.max(0, p - sp)}%`, background: strokeColor || (status === 'exception' ? 'var(--color-error)' : status === 'success' ? 'var(--color-success)' : 'var(--color-primary)'), borderTopLeftRadius: sp ? 0 : undefined, borderBottomLeftRadius: sp ? 0 : undefined }
  const indicator = format ? format(p, sp) : `${p}%`
  const rootClasses = [withPrefix('progress'), withPrefix('progress-line'), status ? withPrefix(`progress-${status}`) : ''].filter(Boolean).join(' ')
  if (steps && steps > 0) {
    const count = steps
    const stepWidth = 100 / count
    const arr = Array.from({ length: count }, (_, i) => i)
    return (
      <div className={rootClasses}>
        <div className={withPrefix('progress-body')} style={{ ...bodyStyle }}>
          <div className={withPrefix('progress-steps')} aria-hidden>
            {arr.map(i => {
              const filled = (i + 1) * stepWidth <= p
              return (
                <span key={i} className={withPrefix('progress-step')} style={{ background: filled ? (strokeColor || 'var(--color-primary)') : (railColor || 'rgba(0,0,0,0.06)') }} />
              )
            })}
          </div>
        </div>
        {showInfo !== false && <div className={withPrefix('progress-indicator')}>{indicator}</div>}
      </div>
    )
  }
  return (
    <div className={rootClasses}>
      <div className={withPrefix('progress-body')} style={{ ...bodyStyle }}>
        <div className={withPrefix('progress-rail')} style={railStyle} aria-hidden />
        {sp > 0 && <div className={withPrefix('progress-track')} style={successStyle} aria-hidden />}
        <div className={withPrefix('progress-track')} style={trackStyle} aria-hidden />
      </div>
      {showInfo !== false && <div className={withPrefix('progress-indicator')}>{indicator}</div>}
    </div>
  )
}

function CircleBase({ percent, format, showInfo, strokeColor, railColor, strokeLinecap = 'round', size = 120, status, gapDegree = 0, dashboard = false }: { percent: number; format?: ProgressProps['format']; showInfo?: boolean; strokeColor?: string; railColor?: string; strokeLinecap?: ProgressProps['strokeLinecap']; size?: number; status?: ProgressProps['status']; gapDegree?: number; dashboard?: boolean }) {
  const p = clamp(percent || 0)
  const w = size || 120
  const r = w / 2 - 6
  const c = 2 * Math.PI * r
  const gap = dashboard ? (gapDegree || 75) : 0
  const usable = c * (360 - gap) / 360
  const dash = usable * (p / 100)
  const offset = (c - usable) / 2
  const color = strokeColor || (status === 'exception' ? 'var(--color-error)' : status === 'success' ? 'var(--color-success)' : 'var(--color-primary)')
  const indicator = format ? format(p, undefined) : `${p}%`
  const rootClasses = [withPrefix('progress'), withPrefix(dashboard ? 'progress-dashboard' : 'progress-circle'), status ? withPrefix(`progress-${status}`) : ''].filter(Boolean).join(' ')
  return (
    <div className={rootClasses} style={{ width: w, height: w }}>
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`} className={withPrefix('progress-body')}>
        <circle cx={w/2} cy={w/2} r={r} stroke={railColor || 'rgba(0,0,0,0.06)'} strokeWidth={10} fill="none" strokeLinecap={strokeLinecap} strokeDasharray={`${usable} ${c}`} strokeDashoffset={offset} />
        <circle cx={w/2} cy={w/2} r={r} stroke={color} strokeWidth={10} fill="none" strokeLinecap={strokeLinecap} strokeDasharray={`${dash} ${c}`} strokeDashoffset={offset} />
      </svg>
      {showInfo !== false && <div className={withPrefix('progress-indicator')}>{indicator}</div>}
    </div>
  )
}

function Progress(props: ProgressProps) {
  const { type = 'line' } = props
  if (type === 'line') return Line(props)
  if (type === 'circle') return CircleBase({ percent: props.percent || 0, format: props.format, showInfo: props.showInfo, strokeColor: props.strokeColor, railColor: props.railColor, strokeLinecap: props.strokeLinecap, size: typeof props.size === 'number' ? props.size : 120, status: props.status })
  return CircleBase({ percent: props.percent || 0, format: props.format, showInfo: props.showInfo, strokeColor: props.strokeColor, railColor: props.railColor, strokeLinecap: props.strokeLinecap, size: typeof props.size === 'number' ? props.size : 120, status: props.status, gapDegree: props.gapDegree || 75, dashboard: true })
}

export default Progress

