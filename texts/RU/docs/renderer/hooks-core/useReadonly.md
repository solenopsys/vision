#### `useReadonly`

This hook creates a read-only observable out of another observable.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#readonly).

Interface:

```ts
function useReadonly <T> ( observable: Observable<T> | ObservableReadonly<T> ): ObservableReadonly<T>;
```

Usage:

```tsx
import {useReadonly} from 'renderer';

useReadonly // => Same as require ( 'reactive' ).readonly
```
