import { ReactNode } from 'react';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>Test</nav>

      {children}
    </section>
  );
}
