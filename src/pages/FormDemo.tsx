import React from 'react';
import { Form, FormItem, Input, Select, Checkbox, Button } from '../components';

export default function FormDemo() {
  const options = [
    { label: 'US', value: 'us' },
    { label: 'UK', value: 'uk' },
    { label: 'DE', value: 'de' },
  ];

  const handleFinish = (values: Record<string, any>) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div style={{ padding: '40px', maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--color-text)' }}>Form Demo</h2>
      <Form initialValues={{ agree: true }} layout="horizontal" onFinish={handleFinish} style={{ background: 'var(--color-surface)', padding: 24, borderRadius: 'var(--radius-medium)', boxShadow: 'var(--shadow-small)' }}>
        <FormItem name="email" label="Email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }] }>
          <Input placeholder="your@email.com" allowClear />
        </FormItem>
        <FormItem name="password" label="Password" required rules={[{ min: 6, message: 'At least 6 chars' }] }>
          <Input placeholder="******" />
        </FormItem>
        <FormItem name="country" label="Country" required>
          <Select options={options} placeholder="Select country" />
        </FormItem>
        <FormItem name="agree" label="Accept Terms" valuePropName="checked" rules={[{ required: true, message: 'Please accept' }] }>
          <Checkbox label="I agree to terms" />
        </FormItem>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
          <Button variant="secondary" type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}

