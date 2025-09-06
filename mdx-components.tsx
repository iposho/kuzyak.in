import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '2.75rem', fontWeight: 600, lineHeight: 1.25 }} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '1.875rem', fontWeight: 600, lineHeight: 1.25 }} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '1.375rem', fontWeight: 500, lineHeight: 1.125 }} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.125 }} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 500, lineHeight: 1.125 }} {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 style={{ maxWidth: '728px', margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.125 }} {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p style={{ width: '100%', maxWidth: '728px', margin: '0 0 0.5rem', lineHeight: 1.5 }} {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul style={{ margin: '0 0 0.5rem', paddingLeft: '1.5rem', listStyleType: 'disc' }} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol style={{ margin: '0 0 0.5rem', paddingLeft: '1.5rem', listStyleType: 'decimal' }} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li style={{ marginBottom: '0.25rem' }} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      style={{
        borderLeft: '4px solid #ddd',
        paddingLeft: '1rem',
        margin: '1rem 0',
        fontStyle: 'italic',
        color: '#666',
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      style={{
        backgroundColor: '#f5f5f5',
        padding: '0.125rem 0.25rem',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
        fontFamily: 'monospace',
      }}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '1rem',
        borderRadius: '0.5rem',
        overflowX: 'auto',
        marginBottom: '1rem',
      }}
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      style={{ color: '#0060a0', textDecoration: 'underline' }}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '1rem' }}
      {...(props as Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
