#### `isBatching`

This function tells you if batching is currently active or not.

Interface:

```ts
function isBatching (): boolean;
```

Usage:

```tsx
import {batch, isBatching} from 'renderer';

// Checking if currently batching

isBatching (); // => false

batch ( () => {

  isBatching (); // => true

});

isBatching (); // => false
```

