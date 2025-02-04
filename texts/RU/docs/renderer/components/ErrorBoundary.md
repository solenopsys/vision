#### `ErrorBoundary`

The error boundary catches errors thrown inside it, and renders a fallback component when that happens.

Interface:

```ts
function ErrorBoundary ( props: { fallback: JSX.Element | (( props: { error: Error, reset: Callback } ) => JSX.Element), children: JSX.Element }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {ErrorBoundary} from 'renderer';

const Fallback = ({ reset, error }: { reset: () => void, error: Error }) => {
  return (
    <>
      <p>Error: {error.message}</p>
      <button onClick={error}>Recover</button>
    </>
  );
};

const SomeComponentThatThrows = () => {
  throw 'whatever';
};

const App = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <SomeComponentThatThrows />
    </ErrorBoundary>
  );
};
```