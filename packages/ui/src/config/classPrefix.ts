let CLASS_PREFIX = 'zephyr'

function normalizePrefix(prefix: string) {
  const p = prefix || CLASS_PREFIX
  return p
}

export function getClassPrefix() {
  return CLASS_PREFIX
}

export function setClassPrefix(prefix: string) {
  CLASS_PREFIX = normalizePrefix(prefix)
}

export function withPrefix(name: string) {
  return `${CLASS_PREFIX}-${name}`
}
