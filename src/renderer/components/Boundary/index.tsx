import { ErrorBoundary } from 'react-error-boundary';

import Example from '@/components/Example';

interface BoundaryProps {
  children: React.ReactNode;
}

const Index = (props: BoundaryProps) => {
  const { children } = props;

  return (
    <ErrorBoundary
      fallback={
        <Example
          data={{
            title: 'Sorry, something went wrong.',
            desc: [
              {
                text: 'An error occurred while rendering the page.',
                type: 'primary',
              },
              {
                text: 'Error Code: 500',
              },
              {
                text: `Location: ${location.href}`,
              },
              {
                text: `Time: ${new Date().toString()}`,
              },
              {
                text: <a href="/">Get Back!</a>,
              },
            ],
            footer: 'Vite Electron App',
          }}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default Index;
