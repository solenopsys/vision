#### `isStore`

This function tells you if a variable is a store or not.

Interface:

```ts
function isStore ( value: unknown ): boolean;
```

Usage:

```tsx
import {store, isStore} from 'renderer';

isStore ( {} ); // => false
isStore ( store ( {} ) ); // => true
```
