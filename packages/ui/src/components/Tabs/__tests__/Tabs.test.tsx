import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../config'
import Tabs from '../Tabs'

function wrap(ui: React.ReactNode) { return <ConfigProvider locale={enUS}>{ui}</ConfigProvider> }

const items = [
  { key: 'tab1', label: 'Tab 1', children: <div>Content 1</div> },
  { key: 'tab2', label: 'Tab 2', children: <div>Content 2</div> },
  { key: 'tab3', label: 'Tab 3', children: <div>Content 3</div>, disabled: true },
]

describe('Tabs', () => {
  it('associates tab and panel via aria-controls and aria-labelledby', () => {
    render(wrap(<Tabs items={items} />))
    const tab = screen.getByRole('tab', { name: 'Tab 1' })
    const controls = tab.getAttribute('aria-controls')!
    const panel = document.getElementById(controls)!
    const labelledby = panel.getAttribute('aria-labelledby')!
    expect(labelledby).toBe(tab.id)
  })

  it('keyboard navigation with ArrowRight skips disabled and changes selection', () => {
    render(wrap(<Tabs items={items} defaultActiveKey={'tab1'} />))
    const tablist = screen.getByRole('tablist')
    tablist.focus()
    fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true')
  })

  it('Home/End keys go to first/last enabled tab', () => {
    render(wrap(<Tabs items={items} defaultActiveKey={'tab2'} />))
    const tablist = screen.getByRole('tablist')
    fireEvent.keyDown(tablist, { key: 'Home' })
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(tablist, { key: 'End' })
    // last enabled is tab2 due to tab3 disabled
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true')
  })
})
