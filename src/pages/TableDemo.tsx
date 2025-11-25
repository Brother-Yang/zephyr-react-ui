import React, { useState } from 'react';
import { Table } from '../components/Table';
import type { TableColumn } from '../types/table';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  status: 'active' | 'inactive';
}

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, city: 'New York', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, city: 'Los Angeles', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 25, city: 'Chicago', status: 'active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29, city: 'Houston', status: 'active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 35, city: 'Phoenix', status: 'inactive' },
  { id: 6, name: 'Diana Davis', email: 'diana@example.com', age: 27, city: 'Philadelphia', status: 'active' },
  { id: 7, name: 'Edward Miller', email: 'edward@example.com', age: 31, city: 'San Antonio', status: 'active' },
  { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', age: 26, city: 'San Diego', status: 'inactive' },
];

const columns: TableColumn<User>[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    sortable: true,
    render: (value) => (
      <a href={`mailto:${value}`} style={{ color: 'var(--color-primary)' }}>
        {value}
      </a>
    ),
  },
  {
    key: 'age',
    title: 'Age',
    width: 100,
    sortable: true,
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: 'city',
    title: 'City',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    render: (value) => (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 500,
          backgroundColor: value === 'active' ? 'var(--color-success)' : 'var(--color-error)',
          color: 'white',
        }}
      >
        {String(value).toUpperCase()}
      </span>
    ),
  },
];

function TableDemo() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px', color: 'var(--color-text)' }}>
        React UI Library - Table Component Demo
      </h1>
      
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={handleRefresh}
          style={{
            padding: '8px 16px',
            marginRight: '16px',
            borderRadius: 'var(--radius-small)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
            cursor: 'pointer',
          }}
        >
          Refresh Data
        </button>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          Selected rows: {selectedRowKeys.length}
        </span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Basic Table</h2>
        <Table
          dataSource={mockData.slice(0, 4)}
          columns={columns}
          size="small"
          bordered
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Table with Sorting & Pagination</h2>
        <Table
          dataSource={mockData}
          columns={columns}
          pagination={{
            current: 1,
            pageSize: 4,
            showSizeChanger: true,
            showTotal: true,
          }}
          striped
          loading={loading}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Table with Row Selection</h2>
        <Table
          dataSource={mockData}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={{
            current: 1,
            pageSize: 4,
          }}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Table with Expandable Rows</h2>
        <Table
          dataSource={mockData.slice(0, 3)}
          columns={columns.slice(0, 4)}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: '16px', backgroundColor: 'var(--color-surface)' }}>
                <h4 style={{ marginBottom: '8px' }}>User Details</h4>
                <p><strong>Email:</strong> {record.email}</p>
                <p><strong>City:</strong> {record.city}</p>
                <p><strong>Status:</strong> {record.status}</p>
              </div>
            ),
          }}
          size="large"
          bordered
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Custom Styled Table</h2>
        <Table
          dataSource={mockData.slice(0, 3)}
          columns={columns.slice(0, 5)}
          style={{
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
          }}
          onRowClick={(record) => {
            alert(`Clicked on ${record.name}`);
          }}
        />
      </div>
    </div>
  );
}

export default TableDemo;