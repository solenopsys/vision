#### `Switch`

This component is the reactive alternative to the native `switch`.

Interface:

```ts
function Switch <T> ( props: { when: FunctionMaybe<T>, fallback?: JSX.Element, children: JSX.Element }): ObservableReadonly<JSX.Element>;

Switch.Case = function <T> ( props: { when: T, children: JSX.Element } ): (() => JSX.Element) & ({ metadata: [T, JSX.Element] });
Switch.Default = function ( props: { children: JSX.Element } ): (() => JSX.Element) & ({ metadata: [JSX.Element] });
```

Usage:

```tsx
import {Switch} from 'renderer';

const App = () => {
  const value = $(0);
  const increment = () => value ( value () + 1 );
  const decrement = () => value ( value () - 1 );
  return (
    <>
      <Switch when={value}>
        <Switch.Case when={0}>
          <p>0, the boundary between positives and negatives! (?)</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1, the multiplicative identity!</p>
        </Switch.Case>
        <Switch.Default>
          <p>{value}, I don't have anything interesting to say about that :(</p>
        </Switch.Default>
      </Switch>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};
```


