
#### `usePromise`

This hook wraps a promise in an observable, so that you can be notified when it resolves or rejects.

This hook uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
function usePromise <T> ( promise: FunctionMaybe<Promise<T>> ): ObservableReadonly<Resource<T>>;
```

Usage:

```tsx
import {usePromise} from 'renderer';

const App = () => {
  const request = fetch ( 'https://my.api' ).then ( res => res.json ( 0 ) );
  const resource = usePromise ( request );
  return () => {
    const state = resource ();
    if ( state.pending ) return <p>pending...</p>;
    if ( state.error ) return <p>{state.error.message}</p>;
    return <p>{JSON.stringify ( state.value )}</p>
  };
};
```