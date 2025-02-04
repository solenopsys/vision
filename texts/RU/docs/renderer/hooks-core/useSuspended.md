#### `useSuspended`

This hook returns a read-only observable that tells you if the closest suspense boundary is currently suspended or not.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#suspended).

Interface:

```ts
function useSuspended (): ObservableReadonly<boolean>;
```

Usage:

```tsx
import {useSuspended} from 'renderer';

useSuspended // => Same as require ( 'reactive' ).suspended
```

