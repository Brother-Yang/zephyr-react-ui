import React from 'react'
import './Tree.less'
import { withPrefix } from '../../config/classPrefix'
import type { TreeProps, TreeNode } from '../../types/tree'

function flatten(nodes: TreeNode[], map: Map<string, TreeNode>, parent: Map<string, string | null>, parentKey: string | null = null) {
  for (const n of nodes) {
    map.set(n.key, n)
    parent.set(n.key, parentKey)
    if (n.children?.length) flatten(n.children, map, parent, n.key)
  }
}

function getDescendants(rootKey: string, map: Map<string, TreeNode>) {
  const result: string[] = []
  function dfs(k: string) {
    const n = map.get(k)
    if (!n || !n.children) return
    for (const c of n.children) { result.push(c.key); dfs(c.key) }
  }
  dfs(rootKey)
  return result
}

function getAncestors(key: string, parent: Map<string, string | null>) {
  const res: string[] = []
  let p = parent.get(key) || null
  while (p) { res.push(p); p = parent.get(p) || null }
  return res
}

export default function Tree({
  treeData,
  defaultExpandedKeys = [],
  expandedKeys,
  onExpand,
  selectable = true,
  multiple = false,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelect,
  checkable = false,
  checkedKeys,
  defaultCheckedKeys = [],
  onCheck,
  showIcon = false,
  iconRender,
  disabled = false,
  className = '',
  style
}: TreeProps) {
  const nodeMap = React.useMemo(() => new Map<string, TreeNode>(), [treeData])
  const parentMap = React.useMemo(() => new Map<string, string | null>(), [treeData])
  React.useMemo(() => { flatten(treeData, nodeMap, parentMap) }, [treeData])

  const [innerExpanded, setInnerExpanded] = React.useState<string[]>(defaultExpandedKeys)
  const [innerSelected, setInnerSelected] = React.useState<string[]>(defaultSelectedKeys)
  const [innerChecked, setInnerChecked] = React.useState<string[]>(defaultCheckedKeys)

  const expanded = expandedKeys ?? innerExpanded
  const selected = selectedKeys ?? innerSelected
  const checked = checkedKeys ?? innerChecked

  function toggleExpand(key: string) {
    if (disabled) return
    const has = expanded.includes(key)
    const next = has ? expanded.filter(k => k !== key) : [...expanded, key]
    if (expandedKeys === undefined) setInnerExpanded(next)
    onExpand?.(next)
  }

  function toggleSelect(key: string, node: TreeNode) {
    if (disabled || node.disabled || !selectable) return
    let next: string[]
    const has = selected.includes(key)
    if (multiple) {
      next = has ? selected.filter(k => k !== key) : [...selected, key]
    } else {
      next = has ? [] : [key]
    }
    if (selectedKeys === undefined) setInnerSelected(next)
    onSelect?.(next, node)
  }

  function cascadeCheck(key: string, node: TreeNode) {
    if (disabled || node.disabled || !checkable) return
    const desc = [key, ...getDescendants(key, nodeMap)]
    let next = new Set(checked)
    const willCheck = !checked.includes(key)
    for (const k of desc) { if (willCheck) next.add(k); else next.delete(k) }
    const ancestors = getAncestors(key, parentMap)
    for (const a of ancestors) {
      const an = nodeMap.get(a)
      const children = an?.children || []
      const allChecked = children.every(c => next.has(c.key))
      const someChecked = children.some(c => next.has(c.key))
      if (allChecked) next.add(a)
      else if (!someChecked) next.delete(a)
    }
    const arr = Array.from(next)
    if (checkedKeys === undefined) setInnerChecked(arr)
    onCheck?.(arr, node, { checked: willCheck, nodeKey: key })
  }

  function renderNodes(nodes: TreeNode[], depth = 0) {
    return (
      <div className={withPrefix('tree-children')}>
        {nodes.map(n => {
          const hasChildren = !!(n.children && n.children.length)
          const isExpanded = hasChildren && expanded.includes(n.key)
          const isSelected = selected.includes(n.key)
          const isChecked = checked.includes(n.key)
          const nodeClasses = [withPrefix('tree-node'), n.disabled ? withPrefix('tree-node-disabled') : '', isSelected ? withPrefix('tree-selected') : ''].filter(Boolean).join(' ')
          return (
            <div key={n.key} className={nodeClasses} style={{ paddingLeft: depth * 12 }}>
              <div className={withPrefix('tree-toggle')}>
                {hasChildren ? (
                  <button className={withPrefix('tree-toggle-btn')} onClick={() => toggleExpand(n.key)} aria-label={isExpanded ? 'Collapse' : 'Expand'} aria-expanded={isExpanded}>
                    <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                  </button>
                ) : <span className={withPrefix('tree-indent')} />}
              </div>
              <div className={withPrefix('tree-title')} onClick={() => toggleSelect(n.key, n)}>
                {checkable && <input
                  type="checkbox"
                  className={withPrefix('tree-checkbox')}
                  checked={isChecked}
                  onChange={() => cascadeCheck(n.key, n)}
                  disabled={disabled || n.disabled}
                  ref={(el) => {
                    if (!el) return
                    const children = n.children || []
                    const some = children.some(c => checked.includes(c.key))
                    const all = children.length > 0 && children.every(c => checked.includes(c.key))
                    el.indeterminate = some && !all && !isChecked
                  }}
                />}
                {showIcon && (iconRender ? iconRender(n) : null)}
                <span>{n.title}</span>
              </div>
              {hasChildren && isExpanded && renderNodes(n.children!, depth + 1)}
            </div>
          )
        })}
      </div>
    )
  }

  const rootClasses = [withPrefix('tree'), className].filter(Boolean).join(' ')
  return (
    <div className={rootClasses} style={style}>
      {renderNodes(treeData, 0)}
    </div>
  )
}
