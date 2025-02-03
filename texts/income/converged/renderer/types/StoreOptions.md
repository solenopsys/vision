#### `StoreOptions`

This type describes the options object that the `store` function accepts.

Interface:

```ts
type StoreOptions = {
  unwrap?: boolean
};
```

Usage:

```ts
import type {StoreOptions} from 'renderer';
import {store} from 'renderer';

const createStore = <T> ( value: T, options?: StoreOptions ): T => {
  return store ( value, options );
};
```
