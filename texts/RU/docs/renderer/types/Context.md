#### `Context`

This type describes the object that `createContext` gives you.

Interface:

```ts
type Context<T = unknown> = {
  Provider ( props: { value: T, children: JSX.Element } ): JSX.Element
};
```

Usage:

```ts
import {useContext} from 'renderer';
import type {Context} from 'renderer';

// Create an alternative useContext that throws if the context is not available

const useNonNullableContext = <T> ( context: Context<T> ): NonNullable<T> => {
  const value = useContext ( context );
  if ( value === null || value === undefined ) throw new Error ( 'Missing context' );
  return value;
};
```