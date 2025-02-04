
#### `useResolved`

This hook receives a value, or an array of values, potentially wrapped in functions and/or observables, and unwraps it/them.

If no callback is used then it returns the unwrapped value, otherwise it returns whatever the callback returns.

This is useful for handling reactive and non reactive values the same way. Usually if the value is a function, or always for convenience, you'd want to wrap the `useResolved` call in a `useMemo`, to maintain reactivity.

This is potentially a more convenient version of `$$`, made especially for handling nicely arguments passed that your hooks receive that may or may not be observables.



Usage:

```tsx
import {$, useResolved} from 'renderer';

useResolved ( 123 ); // => 123

useResolved ( $(123) ); // => 123

useResolved ( () => 123 ); // => 123

useResolved ( () => 123, false ); // => () => 123

useResolved ( $(123), value => 321 ); // => 321

useResolved ( [$(123), () => 123], ( a, b ) => 321 ); // => 321
```

