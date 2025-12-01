import React from 'react'

export interface ModalProps {
  open: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode | null
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent>) => void
  confirmLoading?: boolean
  maskClosable?: boolean
  keyboard?: boolean
  closable?: boolean
  closeIcon?: React.ReactNode
  centered?: boolean
  width?: number | string
  zIndex?: number
  destroyOnHidden?: boolean
  className?: string
  style?: React.CSSProperties
}

