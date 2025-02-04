#### `useContext`

This hook retrieves the value out of a context object.

Interface:

```ts
function useContext <T> ( context: Context<T> ): T | undefined;
```

Usage:

```tsx
import {createContext, useContext} from 'renderer';

const App = () => {
  const ctx = createContext ( 123 );
  const value = useContext ( ctx );
  return <p>{value}</p>;
};
```

