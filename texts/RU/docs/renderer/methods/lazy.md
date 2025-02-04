#### `lazy`

This function creates a lazy component, which is loaded via the provided function only when/if needed.

This function uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
type LazyComponent<P = {}> = ( props: P ) => ObservableReadonly<Child>;
type LazyFetcher<P = {}> = () => Promise<{ default: JSX.Component<P> } | JSX.Component<P>>;
type LazyResult<P = {}> = LazyComponent<P> & ({ preload: () => Promise<void> });

function lazy <P = {}> ( fetcher: LazyFetcher<P> ): LazyResult<P>;
```

Usage:

```ts
import {lazy} from 'renderer';

const LazyComponent = lazy ( () => import ( './component' ) );
```

