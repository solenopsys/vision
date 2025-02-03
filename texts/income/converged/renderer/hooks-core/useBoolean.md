#### `useBoolean`

This hook is like the reactive equivalent of the `!!` operator, it returns you a boolean, or a function to a boolean, depending on the input that you give it.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#boolean).

Interface:

```ts
function useBoolean ( value: FunctionMaybe<unknown> ): FunctionMaybe<boolean>;
```

Usage:

```tsx
import {useBoolean} from 'renderer';

useBoolean // => Same as require ( 'reactive' ).boolean
```

