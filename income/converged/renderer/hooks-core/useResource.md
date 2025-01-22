#### `useResource`

This hook wraps the result of a function call with an observable, handling the cases where the function throws, the result is an observable, the result is a promise or an observale that resolves to a promise, and the promise rejects, so that you don't have to worry about these issues.

This basically provides a unified way to handle sync and async results, observable and non observable results, and functions that throw and don't throw.

This function is also the mechanism through which `Suspense` understands if there are things loading under the hood or not.

When the `value` property is read while fetching, or when the `latest` property is read the first time, or after an error, while fetching, then `Suspense` boundaries will be triggered.

When the `value` property or the `latest` property are read after the fetch errored they will throw, triggering `ErrorBoundary`.

The passed function is tracked and it will be automatically re-executed whenever any of the observables it reads change.

Interface:

```ts
function useResource <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): Resource<T>;
```

Usage:

```tsx
import {useResource} from 'renderer';

const fetcher = () => fetch ( 'https://my.api' );

const resource = useResource ( fetcher );
```

