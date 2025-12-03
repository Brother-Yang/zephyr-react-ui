# Zephyr UI

Website: https://9b290a27.pinit.eth.limo

Next-generation, ultra-lightweight, high-performance React component library: import with one line and start instantly. It covers forms, data display, feedback, and navigation scenarios, with built-in dark theme and internationalization, ready out of the box.
From Button/Input/Select/Form to Table/Tabs/Timeline/Tree, and Modal/Drawer/Tooltip/Progress/DatePicker, one suite covers common components. Accessibility and keyboard interactions, controlled/uncontrolled modes, half-checked cascading, transition animations and other details are all in place. Design token–driven, customizable class name prefix, zero external dependencies, full TypeScript types and unit tests — helping you deliver from MVP to enterprise-grade.

## Installation & Usage

```bash
pnpm add zephyr-react-ui react react-dom
```

```tsx
import {
  ConfigProvider,
  Button,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Table,
  Tabs,
  Form,
  FormItem,
  Empty,
  DatePicker,
  Collapse,
  Timeline,
  Tooltip,
  Rate,
  Modal,
  Progress,
  Tree,
  Drawer
} from 'zephyr-react-ui'

export default function App() {
  return (
    <ConfigProvider theme="light">
      <Button>Primary</Button>
    </ConfigProvider>
  )
}
```

## Components

- Basics: `Button`, `Empty`, `Tooltip`
- Forms: `Input`, `Checkbox`/`CheckboxGroup`, `Radio`/`RadioGroup`, `Select`, `Switch`, `Form`/`FormItem`, `DatePicker`
- Data Display: `Table`, `Tabs`, `Collapse`, `Timeline`, `Rate`, `Progress`, `Tree`
- Feedback: `Modal`, `Drawer`

Component entries are located in `packages/ui/src/components` and are exported from the package root `zephyr-react-ui`.

## Configuration & Theme

`ConfigProvider` offers theme, localization, and class name prefix:

- `theme`: `light | dark | system`
- `locale`: built-in `enUS`, `zhCN`, and partially overridable
- `classPrefix`: set a global class name prefix (default `zephyr-`)

```tsx
import { ConfigProvider, zhCN } from 'zephyr-react-ui'

<ConfigProvider theme="dark" locale={zhCN} classPrefix="app">
  {/* children */}
</ConfigProvider>
```

## Examples

### Modal Dialog

```tsx
import { Modal, Button } from 'zephyr-react-ui'

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        title="Title"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        centered
        confirmLoading={false}
      >
        Content area
      </Modal>
    </>
  )
}
```

### Drawer

```tsx
import { Drawer, Button } from 'zephyr-react-ui'

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Title" placement="right" width={360}>
        Drawer content
      </Drawer>
    </>
  )
}
```

### Progress

```tsx
import { Progress } from 'zephyr-react-ui'

<>
  <Progress type="line" percent={60} />
  <Progress type="circle" percent={75} />
  <Progress type="dashboard" percent={50} />
</>
```

### Tree

```tsx
import { Tree } from 'zephyr-react-ui'

const data = [
  { key: 'a', title: 'A', children: [ { key: 'a1', title: 'A1' } ] },
  { key: 'b', title: 'B' }
]

<Tree
  treeData={data}
  defaultExpandedKeys={[ 'a' ]}
  selectable
  checkable
/>
```

## Development & Testing

- Build: `pnpm -C packages/ui build`
- Test: `pnpm -C packages/ui test`
- Example: `pnpm -C examples/react-vite dev`, visit `http://localhost:5173/`

## Directory Structure

```
packages/ui/src/
  components/      component implementations and styles
  types/           component type definitions
  config.tsx       ConfigProvider with localization/theme
  config/classPrefix.ts utility for class name prefix
  styles/variables.css design tokens
```

## Design Tokens

Define colors, spacing, radii, and shadows in `styles/variables.css`. You can override tokens via `ConfigProvider`'s `tokens` and apply them to the document root.
