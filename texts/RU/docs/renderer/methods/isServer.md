#### `isServer`

This function tells you if your code is executing in a browser environment or not.

Interface:

```ts
function isServer (): boolean;
```

Usage:

```tsx
import {isServer} from 'renderer';

isServer (); // => true or false
```

