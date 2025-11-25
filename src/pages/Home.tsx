import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          React UI Library
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: 'var(--color-text-secondary)',
          marginBottom: '32px'
        }}>
          A modern, accessible React UI component library with TypeScript support
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link
            to="/table"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-medium)',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            View Table Demo
          </Link>
          <a
            href="#"
            style={{
              padding: '12px 24px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-medium)',
              fontWeight: '500',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            Documentation
          </a>
        </div>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: 'var(--color-text)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Features
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-medium)',
            boxShadow: 'var(--shadow-small)'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: 'var(--color-text)',
              marginBottom: '12px'
            }}>
              🎨 Modern Design
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Clean, modern design with CSS variables for easy theming and customization.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-medium)',
            boxShadow: 'var(--shadow-small)'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: 'var(--color-text)',
              marginBottom: '12px'
            }}>
              📱 Responsive
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Fully responsive components that work seamlessly across all devices and screen sizes.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-medium)',
            boxShadow: 'var(--shadow-small)'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: 'var(--color-text)',
              marginBottom: '12px'
            }}>
              🔧 TypeScript Support
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Full TypeScript support with comprehensive type definitions for better development experience.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-medium)',
            boxShadow: 'var(--shadow-small)'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: 'var(--color-text)',
              marginBottom: '12px'
            }}>
              ⚡ Performance
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Optimized components with virtual scrolling and efficient rendering for large datasets.
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-medium)' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'var(--color-text)',
          marginBottom: '16px'
        }}>
          Ready to get started?
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Install the library and start building amazing UIs with our components.
        </p>
        <div style={{
          backgroundColor: 'var(--color-background)',
          padding: '16px',
          borderRadius: 'var(--radius-small)',
          fontFamily: 'monospace',
          color: 'var(--color-text)',
          display: 'inline-block'
        }}>
          npm install @your-org/react-ui-library
        </div>
      </div>
    </div>
  );
}