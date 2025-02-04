#### `createContext`

This function creates a context object, optionally with a default value, which can later be used to provide a new value for the context or to read the current value.

A context's `Provider` will register the value of context with its children.

Interface:

```ts
type ContextProvider<T> = ( props: { value: T, children: JSX.Element } ) => JSX.Element;
type Context<T> = { Provider: ContextProvider<T> };

function createContext <T> ( defaultValue?: T ): Context<T>;
```

Usage:

```tsx
import {createContext, useContext} from 'renderer';

const App = () => {
  const Context = createContext ( 123 );
  return (
    <>
      {() => {
        const value = useContext ( Context );
        return <p>{value}</p>;
      }}
      <Context.Provider value={312}>
        {() => {
          const value = useContext ( Context );
          return <p>{value}</p>;
        }}
      </Context.Provider>
    </>
  );
};
```