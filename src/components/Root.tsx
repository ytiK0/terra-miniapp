import { App } from '@/components/App/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import '@gravity-ui/uikit/styles/styles.css';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div style={{backgroundColor:"white", color: "red"}}>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <App/>
    </ErrorBoundary>
  );
}
