#### `$$`

This function unwraps a potentially observable value.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#get).

Interface:

```ts
function $$ <T> ( value: T ): (T extends ObservableReadonly<infer U> ? U : T);
```

Usage:

```tsx
import {$$} from 'renderer';

// Getting the value out of an observable

const o = $(123);

$$ ( o ); // => 123

// Getting the value out of a function

$$ ( () => 123 ); // => 123

// Getting the value out of an observable but not out of a function

$$ ( o, false ); // => 123
$$ ( () => 123, false ); // => () => 123

// Getting the value out of a non-observable and non-function

$$ ( 123 ); // => 123
```