#### `useSelector`

This hook massively optimizes `isSelected` kind of workloads.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#selector).

Interface:

```ts
type SelectorFunction<T> = ( value: T ) => ObservableReadonly<boolean>;

function useSelector <T> ( source: () => T | ObservableReadonly<T> ): SelectorFunction<T>;
```

Usage:

```tsx
import {useSelector} from 'renderer';

useSelector // => Same as require ( 'reactive' ).selector
```
