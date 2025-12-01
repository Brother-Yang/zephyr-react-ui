import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../index'
import { Modal } from '..'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Modal', () => {
  it('renders when open and shows title/body', () => {
    render(wrap(<Modal open title="Title">Body</Modal>))
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('calls onCancel when mask clicked with maskClosable', () => {
    const onCancel = vi.fn()
    render(wrap(<Modal open title="T" onCancel={onCancel} />))
    const mask = document.querySelector('.zephyr-modal-mask') as HTMLElement
    fireEvent.click(mask)
    expect(onCancel).toHaveBeenCalled()
  })

  it('shows loading via confirmLoading and disables ok', () => {
    const onOk = vi.fn()
    render(wrap(<Modal open title="T" onOk={onOk} confirmLoading />))
    const okBtn = screen.getByRole('button', { name: '确定' })
    expect(okBtn).toHaveAttribute('aria-busy', 'true')
    expect(okBtn).toBeDisabled()
    fireEvent.click(okBtn)
    expect(onOk).not.toHaveBeenCalled()
  })

  it('close button triggers onCancel', () => {
    const onCancel = vi.fn()
    render(wrap(<Modal open title="T" onCancel={onCancel} />))
    const closeBtn = document.querySelector('.zephyr-modal-close') as HTMLElement
    fireEvent.click(closeBtn)
    expect(onCancel).toHaveBeenCalled()
  })

  it('keyboard escape triggers onCancel', () => {
    const onCancel = vi.fn()
    render(wrap(<Modal open title="T" onCancel={onCancel} />))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onCancel).toHaveBeenCalled()
  })
})
