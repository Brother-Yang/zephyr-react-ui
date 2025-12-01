import React from 'react'

export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active'
export type ProgressSize = 'small' | 'default' | 'large' | number

export interface ProgressProps {
  type?: ProgressType
  percent?: number
  status?: ProgressStatus
  showInfo?: boolean
  format?: (percent: number, successPercent?: number) => React.ReactNode
  strokeColor?: string
  railColor?: string
  strokeLinecap?: 'round' | 'butt' | 'square'
  size?: ProgressSize
  steps?: number
  success?: { percent?: number; strokeColor?: string }
  gapDegree?: number
  className?: string
  style?: React.CSSProperties
}

