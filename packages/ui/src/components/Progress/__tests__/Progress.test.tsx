import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from '..'

describe('Progress', () => {
  it('renders line with percent and indicator', () => {
    render(<Progress type="line" percent={30} />)
    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  it('renders circle with percent indicator', () => {
    render(<Progress type="circle" percent={75} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('renders dashboard with percent indicator', () => {
    render(<Progress type="dashboard" percent={60} />)
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('supports format function', () => {
    render(<Progress type="line" percent={50} format={(p) => `Done ${p}%`} />)
    expect(screen.getByText('Done 50%')).toBeInTheDocument()
  })
})

