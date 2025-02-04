#### `isObservable`

This function tells you if a variable is an observable or not.

Interface:

```ts
function isObservable <T = unknown> ( value: unknown ): value is Observable<T> | ObservableReadonly<T>;
```

Usage:

```tsx
import {$, isObservable} from 'renderer';

isObservable ( 123 ); // => false
isObservable ( $(123) ); // => true
```

