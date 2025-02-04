#### `useEffect`

This hook registers a function to be called when any of its dependencies change. If a function is returned it's automatically registered as a cleanup function.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#effect).

Interface:

```ts
function useEffect ( fn: () => (() => void) | void ): (() => void);
```

Usage:

```tsx
import {useEffect} from 'renderer';

useEffect // => Same as require ( 'reactive' ).effect
```

#### `useEffect`

This hook registers a function to be called when any of its dependencies change. If a function is returned it's automatically registered as a cleanup function.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#effect).

Interface:

```ts
function useEffect ( fn: () => (() => void) | void ): (() => void);
```

Usage:

```tsx
import {useEffect} from 'renderer';

useEffect // => Same as require ( 'reactive' ).effect
```

