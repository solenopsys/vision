#### `useFetch`

This hook wraps the output of a fetch request in an observable, so that you can be notified when it resolves or rejects. The request is also aborted automatically when the parent computation gets disposed of.

This hook uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
function useFetch ( request: FunctionMaybe<RequestInfo>, init?: FunctionMaybe<RequestInit> ): ObservableReadonly<Resource<Response>>;
```

Usage:

```tsx
import {useFetch} from 'renderer';

const App = () => {
  const resource = useFetch ( 'https://my.api' );
  return () => {
    const state = resource ();
    if ( state.pending ) return <p>pending...</p>;
    if ( state.error ) return <p>{state.error.message}</p>;
    return <p>Status: {state.value.status}</p>
  };
};
```