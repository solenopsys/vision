#### `Resource`

This is the type of object that `useResource`, `usePromise` and `useFetch` will return you.

It's an object that tells if whether the resource is loading or not, whether an error happened or not, if what the eventual resulting value is.

It's a read-only observable that holds the resulting object, but it also comes with helper methods for retrieving specific keys out of the object, which can make some code much cleaner.

Helper methods are memoized automatically for you.

Interface:

```ts
type ResourceStaticPending<T> = { pending: true, error?: never, value?: never, latest?: T };
type ResourceStaticRejected = { pending: false, error: Error, value?: never, latest?: never };
type ResourceStaticResolved<T> = { pending: false, error?: never, value: T, latest: T };
type ResourceStatic<T> = ResourceStaticPending<T> | ResourceStaticRejected | ResourceStaticResolved<T>;
type ResourceFunction<T> = { pending (): boolean, error (): Error | undefined, value (): T | undefined, latest (): T | undefined };
type Resource<T> = ObservableReadonly<ResourceStatic<T>> & ResourceFunction<T>;
```

Usage:

```tsx
import type {ObservableReadonly, Resource} from 'renderer';

const resource: Resource<Response> = useResource ( () => fetch ( 'https://my.api' ) );

// Reading the static object

resource ().pending; // => true | false
resource ().error; // => Error | undefined
resource ().value; // => Whatever the resource will resolve to
resource ().latest; // => Whatever the resource will resolve to, or the previous known resolved value if the resource is pending

// Using helper methods

resource.pending (); // => true | false
resource.error (); // => Error | undefined
resource.value (); // => Whatever the resource will resolve to
resource.latest (); // => Whatever the resource will resolve to, or the previous known resolved value if the resource is pending
```